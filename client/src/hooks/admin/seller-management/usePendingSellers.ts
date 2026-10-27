import { getPendingSellers } from "@/api/admin/adminSellerManagementApi";
import type { ApiError } from "@/api/apiError";
import type { PendingSellersResponse } from "@/types/admin";
import type { PaginationParams } from "@/types/pagination";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const usePendingSellers = (params?: PaginationParams) => {
  return useQuery<PendingSellersResponse, ApiError>({
    queryKey: queryKeys.adminPendingSeller(params),
    queryFn: () => getPendingSellers(params),
  });
};
