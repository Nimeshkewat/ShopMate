import type { ShopProductsResponse, ShopsResponse } from "@/types/shop";
import { api } from "./apiClient";
import type { PaginationParams } from "@/types/pagination";

const BASE = "/shop";
export const fetchShops = async (
  params?: PaginationParams,
): Promise<ShopsResponse> => {
  const response = await api.get<ShopsResponse>(BASE, { params });
  return response.data;
};

export const fetchShopProducts = async (
  id: string,
  params?: PaginationParams,
): Promise<ShopProductsResponse> => {
  const response = await api.get<ShopProductsResponse>(`${BASE}/${id}`, {
    params,
  });
  return response.data;
};
