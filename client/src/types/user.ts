export interface Shop {
  _id: string;
  userId: string;
  shopName: string;
  shopImage?: string;
  shopImagePublicID?: string;
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

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "seller" | "admin";
  shopId?: Shop;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  success: boolean;
  user: User;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}
