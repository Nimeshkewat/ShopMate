import type { PaginationMeta } from "./pagination";
import type { Product } from "./product";

export interface Shop {
  _id: string;
  shopName: string;
  shopDescription: string;
  shopImage?: string;
  productCount: number;
  createdAt: string;
}

export type ShopSummary = Pick<
  Shop,
  "_id" | "shopName" | "shopDescription" | "shopImage"
>;

export interface ShopsResponse {
  success: boolean;
  shops: Shop[];
  pagination: PaginationMeta;
}

export interface ShopProductsResponse {
  success: boolean;
  shop: ShopSummary;
  products: Product[];
  pagination: PaginationMeta;
}
