import { fetchShops } from "@/api/shopApi";
import type { PaginationParams } from "@/types/pagination";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useShops = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.shops,
    queryFn: () => fetchShops(params),
    staleTime: 5 * 60 * 1000,
  });
};
