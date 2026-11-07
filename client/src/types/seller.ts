import type { BecomeSellerValues } from "@/schema/seller";
import type { Product } from "./product";
import type { Order } from "./order";
import type { PaginationMeta } from "./pagination";

export interface Shop {
  _id: string;
  userId: string;
  shopName: string;
  shopDescription: string;
  shopImage?: string;
  shopImagePublicId?: string;
  businessPhone: string;
  taxId: string;
  isApproved: boolean;
  payoutBankDetails?: {
    accountNumber?: string;
    ifscCode?: string;
    bankName?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface BecomeSellerPayload extends Omit<
  BecomeSellerValues,
  "shopImage"
> {
  shopImage?: File | string | null;
}

export interface BecomeSellerResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    shopId: string;
  };
}

//* Seller Panel Types
export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: File[];
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}

export interface CreateProductResponse {
  success: boolean;
  message: string;
  newProduct: Product;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export interface UpdateProductResponse {
  success: boolean;
  message: string;
  product: Product;
}

//* Seller Orders
export type NextOrderStatus = "Shipped" | "Delivered";

//* the backend returns only this seller's items in each order, with the address populated
export interface SellerOrdersResponse {
  success: boolean;
  sellerOrders: Order[];
  pagination: PaginationMeta;
}

export interface UpdateOrderStatusPayload {
  id: string;
  orderStatus: NextOrderStatus;
}

export interface UpdateOrderStatusResponse {
  success: boolean;
  message: string;
  order: Order;
}
