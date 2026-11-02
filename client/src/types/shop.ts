import type { PaginationMeta } from "./pagination";
import type { Product } from "./product";
import type { Shop as MainShopType } from "./seller";

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

//* Shop Settings
export interface UpdateShopPayload {
  shopName: string;
  shopDescription: string;
  shopImage: File | null;
  removeShopImage?: boolean;
}

export interface GetShopResponse {
  success: boolean;
  shop: MainShopType;
}

export interface UpdateShopResponse {
  success: boolean;
  message: string;
  shop: MainShopType;
}
