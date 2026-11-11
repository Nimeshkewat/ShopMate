import type {
  AddToWishlistResponse,
  ClearWishlistResponse,
  RemoveFromWishlistResponse,
  WishlistResponse,
} from "@/types/wishlist";
import { api } from "./apiClient";

const BASE = "/wishlist";
export const addToWishlist = async (
  productId: string,
): Promise<AddToWishlistResponse> => {
  const response = await api.post<AddToWishlistResponse>(
    `${BASE}/${productId}`,
  );
  return response.data;
};

export const fetchWishlist = async (): Promise<WishlistResponse> => {
  const response = await api.get<WishlistResponse>(BASE);
  return response.data;
};

export const removeFromWishlist = async (
  productId: string,
): Promise<RemoveFromWishlistResponse> => {
  const response = await api.delete<RemoveFromWishlistResponse>(
    `${BASE}/${productId}`,
  );
  return response.data;
};

export const clearWishlist = async (): Promise<ClearWishlistResponse> => {
  const response = await api.delete<ClearWishlistResponse>(`${BASE}/clear`);
  return response.data;
};
