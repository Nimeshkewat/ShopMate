import type { Shop } from "./seller";

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
