import { getPendingSellers } from "@/api/admin/adminSellerManagementApi";
import type { ApiError } from "@/api/apiError";
import type { PendingSellersResponse } from "@/types/admin";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

interface UsePendingSellersParams {
  page?: number;
  limit?: number;
}

export const usePendingSellers = (params?: UsePendingSellersParams) => {
  return useQuery<PendingSellersResponse, ApiError>({
    queryKey: queryKeys.adminPendingSeller(params),
    queryFn: () => getPendingSellers(params),
  });
};

