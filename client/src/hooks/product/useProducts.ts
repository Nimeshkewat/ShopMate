import type { ApiError } from "@/api/apiError";
import { fetchProducts } from "@/api/productApi";
import type { ProductQuery, ProductsResponse } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (query?: ProductQuery) => {
  return useQuery<ProductsResponse, ApiError>({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
    staleTime: 5 * 60 * 1000,
  });
};
