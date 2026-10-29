import { getAllAdminProducts } from "@/api/admin/productManagementApi";
import type { PaginationParams } from "@/types/pagination";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useAdminProducts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.adminProducts(params),
    queryFn: () => getAllAdminProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};
