import { getAllAdminOrders } from "@/api/admin/adminOrderManagementApi";
import type { PaginationParams } from "@/types/pagination";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrders = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.adminOrders(params),
    queryFn: () => getAllAdminOrders(params),
    staleTime: 5 * 60 * 1000,
  });
};
