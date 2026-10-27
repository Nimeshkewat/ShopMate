import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { fetchSellerDashboard } from "@/api/seller/sellerDashboardApi";

export function useSellerDashboard() {
  return useQuery({
    queryKey: queryKeys.sellerDashboard,
    queryFn: fetchSellerDashboard,
    retry: false,
  });
}
