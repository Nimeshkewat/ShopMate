import type { Order, OrderItem, OrderStatus, PaymentType } from "./order";
import type { PaymentStatus } from "./payment";
import type { PaginationMeta } from "./pagination";
import type { ProductImage } from "./product";
import type { Shop } from "./seller";
import type { ShippingInfo } from "./shipping";
import type { User } from "./user";

//* Seller Management
export interface PopulatedShopUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface PendingSeller {
  _id: string;
  shopName: string;
  shopImage?: string;
  businessPhone: string;
  taxId: string;
  isApproved: boolean;
  payoutBankDetails?: {
    accountNumber?: string;
    ifscCode?: string;
    bankName?: string;
  };
  userId: PopulatedShopUser;
  createdAt: string;
  updatedAt: string;
}

export interface PendingSellersResponse {
  success: boolean;
  pendingSellers: PendingSeller[];
  pagination: PaginationMeta;
}

export interface ApproveSellerResponse {
  success: boolean;
  message: string;
  shop: Shop;
}

export interface RejectSellerResponse {
  success: boolean;
  message: string;
}

//* User Management
export interface AllUsersResponse {
  success: boolean;
  users: User[];
  pagination: PaginationMeta;
}

export interface GetUserResponse {
  success: boolean;
  users: User[];
}

export interface UserResponse {
  success: boolean;
  message: string;
  user: User;
}

//* Product Management
export interface AdminProduct {
  _id: string;
  sellerId: { username: string; email: string; role: string };
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  images: ProductImage[];
  reviewCount?: number;
  createdAt: string;
}

export interface GetAllAdminProductsResponse {
  success: boolean;
  products: AdminProduct[];
  pagination: PaginationMeta;
}

export interface DeleteAdminProductResponse {
  success: boolean;
  message: string;
}

//* Order Management
export interface AdminOrder {
  _id: string;
  userId: { username: string; email: string } | null;
  shippingInfoId: ShippingInfo;
  orderItems: OrderItem[];
  price: number;
  tax: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  paymentType?: PaymentType;
  paymentStatus?: PaymentStatus;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllAdminOrdersResponse {
  success: boolean;
  orders: AdminOrder[];
  pagination: PaginationMeta;
}

export interface GetAminOrderResponse {
  success: boolean;
  order: AdminOrder;
}

export interface UpdatePaymentStatusPayload {
  id: string;
  orderStatus: string;
}

export interface UpdateAdminOrderStatusResponse {
  success: boolean;
  message: string;
  order: Order;
}

//* Admin Dashboard
export interface AdminDashboardStats {
  users: number;
  sellers: number;
  pendingSellers: number;
  products: number;
  totalOrders: number;
  revenue: number;
  orderStatus: { status: OrderStatus; count: number }[];
}

export interface RecentOrder {
  _id: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  createdAt: string;
  userId: { username: string };
}

export interface AdminDashboardResponse {
  stats: AdminDashboardStats;
  recentOrders: RecentOrder[];
}
