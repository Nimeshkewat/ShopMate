import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { fetchSellerOrders } from "@/api/seller/sellerOrdersApi";
import type { PaginationParams } from "@/types/pagination";

export function useSellerOrders(
  params?: PaginationParams & { status?: string },
) {
  return useQuery({
    queryKey: [...queryKeys.sellerOrders, params],
    queryFn: () => fetchSellerOrders(params),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
