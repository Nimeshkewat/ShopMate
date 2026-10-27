import type { PaginationMeta } from "./product";
import type { Shop } from "./seller";

//* Seller Management Types
interface PopulatedShop extends Omit<Shop, "userId"> {
  username: string;
  email: string;
  role: string;
  avatar: string;
}
export interface PendingSellersResponse {
  success: boolean;
  pendingSellers: PopulatedShop;
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
