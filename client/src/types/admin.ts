import type { PaginationMeta } from "./pagination";
import type { Shop } from "./seller";

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
