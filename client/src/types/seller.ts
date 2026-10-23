import type { BecomeSellerValues } from "@/schema/seller";
import type { Product } from "./product";

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
