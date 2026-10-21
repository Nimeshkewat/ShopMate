import type { BecomeSellerValues } from "@/schema/seller";

export interface BecomeSellerPayload
  extends Omit<BecomeSellerValues, "shopImage"> {
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
