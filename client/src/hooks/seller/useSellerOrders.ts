import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { fetchSellerOrders } from "@/api/seller/sellerOrdersApi";

export function useSellerOrders() {
  return useQuery({
    queryKey: queryKeys.sellerOrders,
    queryFn: fetchSellerOrders,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
