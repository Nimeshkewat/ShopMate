import { fetchShopProducts } from "@/api/shopApi";
import type { PaginationParams } from "@/types/pagination";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useShopProducts = (id: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.shopProducts(id),
    queryFn: () => fetchShopProducts(id, params),
  });
};
