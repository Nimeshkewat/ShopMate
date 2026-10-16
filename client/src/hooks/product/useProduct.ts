import type { ApiError } from "@/api/apiError";
import { fetchProductById } from "@/api/productApi";
import type { ProductDetailsResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  return useQuery<ProductDetailsResponse, ApiError>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
