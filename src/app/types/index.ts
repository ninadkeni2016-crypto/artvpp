// User Types
export type UserRole = 'customer' | 'vendor' | 'creator' | 'admin';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  isApproved?: boolean;
  approvalDate?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface AdminStats {
  users: number;
  artists: number;
  creators: number;
  orders: number;
  products: number;
  services: number;
  courses: number;
  revenue: number;
}



// Product Types
export type ProductType = 'physical' | 'digital' | 'merchandise';
export type ProductCategory =
  | 'original-art'
  | 'prints'
  | 'handcrafted'
  | 'miniatures'
  | 'traditional-art'
  | 'art-books'
  | 'stationery'
  | 'clothing'
  | 'home-decor'
  | 'accessories'
  | 'digital-illustration'
  | 'nft'
  | 'stock-photos'
  | 'templates'
  | 'fonts-icons'
  | 'tote-bags'
  | 'mugs'
  | 'cushions'
  | 'phone-covers'
  | 'stickers'
  | 'postcards'
  | 'bookmarks'
  | 'wall-plates'
  | 'lampshades'
  | 'frames'
  | 'wallpapers'
  | 'brush-packs'
  | 'portrait-painting';

export interface Product {
  id: string;
  title: string;
  description: string;
  type: ProductType;
  category: ProductCategory;
  price: number;
  images: string[];
  vendorId: string;
  vendorName: string;
  vendorAvatar?: string;
  stock?: number;
  digitalFileUrl?: string;
  tags: string[];
  dimensions?: string;
  materials?: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

// Service Types
export type ServiceType = 'custom' | 'commission' | 'limited-edition' | 'art-service';

export interface Service {
  id: string;
  title: string;
  description: string;
  type: ServiceType;
  price: number;
  priceType: 'fixed' | 'starting-from' | 'custom-quote';
  images: string[];
  vendorId: string;
  vendorName: string;
  vendorAvatar?: string;
  deliveryTime: string;
  tags: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  availableSlots?: number;
  createdAt: string;
}

// Educational Types
export type CourseType = 'workshop' | 'course' | 'masterclass';

export interface Course {
  id: string;
  title: string;
  description: string;
  type: CourseType;
  instructor: string;
  instructorAvatar?: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  image: string;
  tags: string[];
  startDate?: string;
  mode: 'online' | 'offline' | 'hybrid';
  maxParticipants?: number;
  enrolled: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  createdAt: string;
}

// Cart & Order Types
export interface CartItem {
  id: string;
  productId?: string;
  serviceId?: string;
  courseId?: string;
  itemType: 'product' | 'service' | 'course';
  title: string;
  price: number;
  quantity: number;
  image: string;
  vendorId: string;
  customizationNotes?: string;
  instructor?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'in-progress'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'returned'
  | 'refunded';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress?: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

// Commission Types
export interface CommissionRequest {
  id: string;
  userId: string;
  vendorId: string;
  serviceId: string;
  title: string;
  description: string;
  budget: number;
  deadline?: string;
  referenceImages: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  revenueGrowth: number;
  ordersGrowth: number;
  usersGrowth: number;
  productsGrowth: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}
