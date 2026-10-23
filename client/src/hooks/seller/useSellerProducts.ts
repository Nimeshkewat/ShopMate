import { useQuery } from "@tanstack/react-query";
import type { ApiError } from "@/api/apiError";
import { fetchSellerProducts } from "@/api/seller/sellerProductApi";
import type { ProductsResponse } from "@/types/product";

export const queryKey = ["seller-products"] as const;

export const useSellerProducts = () => {
  return useQuery<ProductsResponse, ApiError>({
    queryKey,
    queryFn: fetchSellerProducts,
    staleTime: 2 * 60 * 1000,
  });
};
