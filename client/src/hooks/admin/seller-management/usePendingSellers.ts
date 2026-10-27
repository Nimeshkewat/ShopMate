import { getPendingSellers } from "@/api/admin/adminSellerManagementApi";
import type { ApiError } from "@/api/apiError";
import type { PendingSellersResponse } from "@/types/admin";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const usePendingSellers = () => {
  return useQuery<PendingSellersResponse, ApiError>({
    queryKey: queryKeys.adminPendingSeller,
    queryFn: getPendingSellers,
  });
};
