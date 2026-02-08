// API Service Layer
// This file provides a template for integrating with a real backend API

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// API Client Configuration
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Auth APIs
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Product APIs
  async getProducts(filters?: any) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/products?${query}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(data: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, { method: 'DELETE' });
  }

  // Service APIs
  async getServices(filters?: any) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/services?${query}`);
  }

  async getService(id: string) {
    return this.request(`/services/${id}`);
  }

  // Course APIs
  async getCourses(filters?: any) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/courses?${query}`);
  }

  async getCourse(id: string) {
    return this.request(`/courses/${id}`);
  }

  async enrollCourse(courseId: string) {
    return this.request(`/courses/${courseId}/enroll`, { method: 'POST' });
  }

  // Cart APIs
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(item: any) {
    return this.request('/cart/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId: string) {
    return this.request(`/cart/items/${itemId}`, { method: 'DELETE' });
  }

  // Order APIs
  async createOrder(data: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getOrders(filters?: any) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/orders?${query}`);
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // User APIs
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getVendorStats() {
    return this.request('/vendors/stats');
  }

  async getAdminStats() {
    return this.request('/admin/stats');
  }

  // File Upload
  async uploadFile(file: File, type: 'product' | 'profile' | 'digital') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Payment APIs
  async createPaymentIntent(amount: number, orderId: string) {
    return this.request('/payments/intent', {
      method: 'POST',
      body: JSON.stringify({ amount, orderId }),
    });
  }

  async verifyPayment(paymentId: string, signature: string) {
    return this.request('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ paymentId, signature }),
    });
  }

  // Commission APIs
  async createCommissionRequest(data: any) {
    return this.request('/commissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCommissionRequests(filters?: any) {
    const query = new URLSearchParams(filters).toString();
    return this.request(`/commissions?${query}`);
  }

  async updateCommissionStatus(id: string, status: string) {
    return this.request(`/commissions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Review APIs
  async createReview(productId: string, data: any) {
    return this.request(`/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getReviews(productId: string) {
    return this.request(`/products/${productId}/reviews`);
  }

  // Search API
  async search(query: string, filters?: any) {
    const params = new URLSearchParams({ q: query, ...filters }).toString();
    return this.request(`/search?${params}`);
  }
}

// Export singleton instance
export const api = new ApiClient(API_BASE_URL);

// Usage Example:
/*
import { api } from './api-client';

// In a component or context:
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await api.login(email, password);
    localStorage.setItem('auth_token', response.token);
    setUser(response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const loadProducts = async () => {
  try {
    const products = await api.getProducts({ type: 'physical', limit: 20 });
    setProducts(products);
  } catch (error) {
    console.error('Failed to load products:', error);
  }
};
*/

// GraphQL Client (Alternative)
export class GraphQLClient {
  private endpoint: string;
  private token: string | null = null;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.token = localStorage.getItem('auth_token');
  }

  async query<T>(query: string, variables?: any): Promise<T> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: JSON.stringify({ query, variables }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    return data;
  }
}

// Example GraphQL queries
export const QUERIES = {
  GET_PRODUCTS: `
    query GetProducts($type: ProductType, $limit: Int) {
      products(type: $type, limit: $limit) {
        id
        title
        description
        price
        images
        vendor {
          id
          name
          avatar
        }
      }
    }
  `,
  GET_USER_PROFILE: `
    query GetUserProfile {
      me {
        id
        email
        name
        role
        avatar
      }
    }
  `,
};

export const MUTATIONS = {
  LOGIN: `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
          name
          role
        }
      }
    }
  `,
  ADD_TO_CART: `
    mutation AddToCart($productId: ID!, $quantity: Int!) {
      addToCart(productId: $productId, quantity: $quantity) {
        id
        items {
          id
          product {
            id
            title
            price
          }
          quantity
        }
      }
    }
  `,
};
