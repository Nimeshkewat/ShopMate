import { getUsers } from "@/api/admin/adminUserManagementApi";
import type { PaginationParams } from "@/types/pagination";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...queryKeys.adminUsers, params],
    queryFn: () => getUsers(params),
    staleTime: 5 * 60 * 1000,
  });
};
