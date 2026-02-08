import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, Product, Order, Service, Course } from '../app/types';

// API Base URL
const API_URL = import.meta.env.PROD
    ? "https://artvpp-lake.vercel.app"
    : "http://localhost:4000";

// Create Axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem('kalavpp_user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                // Assuming the backend expects a Bearer token, though basic auth might be different.
                // If the backend returns a token on login, we should store and use that.
                // For now, we'll send the user ID or a dummy token if needed, or rely on the backend implementation.
                // Looking at backend auth middleware, it likely uses JWT.
                // We need to update AuthContext to store the token.
                const token = localStorage.getItem('kalavpp_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error parsing user from local storage', error);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized (e.g., token expired)
        if (error.response && error.response.status === 401) {
            // localStorage.removeItem('kalavpp_token');
            // localStorage.removeItem('kalavpp_user');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// --- Auth API ---
export const authApi = {
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
        const response = await api.post('/auth/login', { email, password });
        // Transform backend user to frontend User type if needed
        const { user, token } = response.data;
        return {
            user: mapBackendUserToFrontend(user),
            token,
        };
    },

    register: async (
        name: string,
        email: string,
        password: string,
        role: 'customer' | 'vendor'
    ): Promise<{ user: User; token: string }> => {
        const response = await api.post('/auth/register', { name, email, password, role });
        const { user, token } = response.data;
        return {
            user: mapBackendUserToFrontend(user),
            token,
        };
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get('/auth/profile');
        return mapBackendUserToFrontend(response.data.user);
    },

    updateProfile: async (data: Partial<User>): Promise<User> => {
        const response = await api.put('/auth/profile', data);
        return mapBackendUserToFrontend(response.data.user);
    }
};

// --- Products API ---
export const productApi = {
    getProducts: async (filters?: { category?: string; type?: string; artistId?: string }): Promise<Product[]> => {
        const params = new URLSearchParams();
        if (filters?.category) params.append('category', filters.category);
        if (filters?.type) params.append('type', filters.type);
        if (filters?.artistId) params.append('artistId', filters.artistId);

        const response = await api.get(`/products?${params.toString()}`);
        return response.data.data.map(mapBackendProductToFrontend);
    },

    getProductById: async (id: string): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return mapBackendProductToFrontend(response.data.data);
    },

    createProduct: async (productData: Partial<Product>): Promise<Product> => {
        const response = await api.post('/products', productData);
        return mapBackendProductToFrontend(response.data.data);
    }
};

// --- Payment API ---
export const paymentApi = {
    createOrder: async (amount: number, currency: string = 'INR'): Promise<{ id: string; currency: string; amount: number }> => {
        const response = await api.post('/payments/create-order', { amount, currency });
        return response.data;
    },

    verifyPayment: async (paymentData: any): Promise<{ status: string; orderId: string }> => {
        const response = await api.post('/payments/verify', paymentData);
        return response.data;
    }
};


// --- Orders API ---
export const orderApi = {
    getUserOrders: async (userId: string): Promise<Order[]> => {
        const response = await api.get(`/orders/user/${userId}`);
        return response.data.data.map(mapBackendOrderToFrontend);
    }
};

// --- Services API ---
export const serviceApi = {
    getServices: async (): Promise<Service[]> => {
        const response = await api.get('/services');
        return response.data.data.map(mapBackendServiceToFrontend);
    }
};

// --- Courses API ---
export const courseApi = {
    getCourses: async (): Promise<Course[]> => {
        const response = await api.get('/courses');
        return response.data.data.map(mapBackendCourseToFrontend);
    }
};

// --- Helper Functions ---

// Map backend user object to frontend User type
function mapBackendUserToFrontend(backendUser: any): User {
    return {
        id: backendUser.id || backendUser._id,
        name: backendUser.name,
        email: backendUser.email,
        role: backendUser.role === 'artist' ? 'vendor' : (backendUser.role || 'customer'),
        avatar: backendUser.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.name}`,
        bio: backendUser.bio,
        createdAt: backendUser.createdAt,
    };
}

// Map backend product object to frontend Product type
function mapBackendProductToFrontend(backendProduct: any): Product {
    const vendor = typeof backendProduct.artistId === 'object' ? backendProduct.artistId : null;

    return {
        id: backendProduct.id || backendProduct._id || backendProduct.productId,
        title: backendProduct.title,
        description: backendProduct.description,
        type: backendProduct.type,
        category: backendProduct.category,
        price: backendProduct.price,
        images: backendProduct.images && backendProduct.images.length > 0
            ? backendProduct.images
            : ['https://via.placeholder.com/400x300?text=No+Image'],
        vendorId: vendor ? (vendor.id || vendor._id) : (backendProduct.artistId || 'unknown'),
        vendorName: vendor ? vendor.name : 'Unknown Artist',
        vendorAvatar: vendor ? (vendor.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${vendor.name}`) : undefined,
        stock: backendProduct.stock,
        tags: backendProduct.tags || [],
        dimensions: backendProduct.dimensions,
        materials: backendProduct.materials,
        featured: backendProduct.featured || false,
        rating: backendProduct.rating || 0,
        reviewCount: backendProduct.reviewCount || 0,
        createdAt: backendProduct.createdAt,
        digitalFileUrl: backendProduct.digitalFileUrl,
    };
}

// Map backend service object to frontend Service type
function mapBackendServiceToFrontend(backendService: any): Service {
    const vendor = typeof backendService.artistId === 'object' ? backendService.artistId : null;

    return {
        id: backendService._id,
        title: backendService.title,
        description: backendService.description,
        type: backendService.category || 'custom',
        price: backendService.price,
        priceType: backendService.priceType || 'fixed',
        images: backendService.images || [],
        vendorId: vendor ? (vendor.id || vendor._id) : (backendService.artistId || 'unknown'),
        vendorName: vendor ? vendor.name : 'Unknown Artist',
        vendorAvatar: vendor ? (vendor.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${vendor.name}`) : undefined,
        deliveryTime: backendService.deliveryTime || 'TBD',
        tags: backendService.tags || [],
        featured: backendService.featured || false,
        rating: backendService.rating || 0,
        reviewCount: backendService.reviewCount || 0,
        createdAt: backendService.createdAt,
    };
}

// Map backend course object to frontend Course type
function mapBackendCourseToFrontend(backendCourse: any): Course {
    const instructor = typeof backendCourse.instructorId === 'object' ? backendCourse.instructorId : null;

    return {
        id: backendCourse._id,
        title: backendCourse.title,
        description: backendCourse.description,
        type: backendCourse.category || 'course',
        instructor: instructor ? instructor.name : 'Unknown Instructor',
        instructorAvatar: instructor ? (instructor.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.name}`) : undefined,
        price: backendCourse.price,
        duration: backendCourse.duration || 'TBD',
        level: backendCourse.level || 'beginner',
        image: backendCourse.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image',
        tags: backendCourse.tags || [],
        mode: backendCourse.mode || 'online',
        enrolled: backendCourse.studentsEnrolled?.length || 0,
        rating: backendCourse.rating || 0,
        reviewCount: backendCourse.reviewCount || 0,
        featured: backendCourse.featured || false,
        createdAt: backendCourse.createdAt,
    };
}

// Map backend order to frontend Order type
function mapBackendOrderToFrontend(backendOrder: any): Order {
    return {
        id: backendOrder.orderId || backendOrder._id,
        userId: backendOrder.userId,
        items: backendOrder.items.map((item: any) => ({
            id: item._id || 'unknown', // Cart items might not have IDs in legacy orders
            itemType: item.itemType || 'product',
            title: item.title || 'Unknown Item',
            price: item.price,
            quantity: item.quantity,
            image: item.image || 'https://via.placeholder.com/150',
            vendorId: item.vendorId || 'unknown',
        })),
        subtotal: backendOrder.totalAmount, // Backend doesn't split tax/shipping yet
        tax: 0,
        shipping: 0,
        total: backendOrder.totalAmount,
        status: backendOrder.orderStatus,
        paymentMethod: 'Razorpay', // Hardcoded for now
        paymentStatus: backendOrder.paymentStatus,
        createdAt: backendOrder.createdAt,
        updatedAt: backendOrder.updatedAt
    };
}

export default api;
