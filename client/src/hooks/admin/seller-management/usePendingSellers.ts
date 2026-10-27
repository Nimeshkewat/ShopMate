import { getPendingSellers } from "@/api/admin/adminSellerManagementApi";
import type { PaginationParams } from "@/types/pagination";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const usePendingSellers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.adminPendingSeller(params),
    queryFn: () => getPendingSellers(params),
  });
};
