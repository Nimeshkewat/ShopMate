import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import {
  fetchSellerDashboard,
  type SellerDashboardResponse,
} from "@/api/seller/sellerDashboardApi";

export function useSellerDashboard() {
  return useQuery<SellerDashboardResponse, ApiError>({
    queryKey: queryKeys.sellerDashboard,
    queryFn: fetchSellerDashboard,
    retry: false,
  });
}
