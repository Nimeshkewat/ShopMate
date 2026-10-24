import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { fetchSellerOrders } from "@/api/seller/sellerOrdersApi";
import type { SellerOrdersResponse } from "@/types/seller";

export function useSellerOrders() {
  return useQuery<SellerOrdersResponse, ApiError>({
    queryKey: queryKeys.sellerOrders,
    queryFn: fetchSellerOrders,
    retry: false, //* a 403 means "not approved yet", retrying won't help
  });
}
