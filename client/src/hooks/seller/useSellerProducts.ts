import { useQuery } from "@tanstack/react-query";
import { fetchSellerProducts } from "@/api/seller/sellerProductApi";
import type { PaginationParams } from "@/types/pagination";

export const queryKey = ["seller-products"] as const;

export const useSellerProducts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => fetchSellerProducts(params),
    staleTime: 2 * 60 * 1000,
  });
};
