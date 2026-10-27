import type { PaginationMeta } from "./pagination";

export type StockStatus = "in" | "limited" | "out";

export interface ProductImage {
  public_id: string;
  url: string;
}

export interface Product {
  _id: string;
  sellerId: string;
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

export type { PaginationMeta } from "./pagination";

export interface ProductQuery {
  search?: string;
  category?: string;
  price?: string;
  maxPrice?: number;
  minRating?: number;
  rating?: number;
  availability?: StockStatus;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination?: PaginationMeta;
}

export interface ProductDetailsResponse {
  success: boolean;
  product: Product;
}

export interface AISearchResponse {
  success: boolean;
  message?: string;
  products: Product[];
}
