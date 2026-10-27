import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { fetchSellerOrders } from "@/api/seller/sellerOrdersApi";

export function useSellerOrders() {
  return useQuery({
    queryKey: queryKeys.sellerOrders,
    queryFn: fetchSellerOrders,
    retry: false, //* a 403 means "not approved yet", retrying won't help
  });
}
