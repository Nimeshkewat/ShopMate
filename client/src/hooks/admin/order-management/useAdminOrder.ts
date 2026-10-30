import { getAdminOrder } from "@/api/admin/adminOrderManagementApi";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useAdminOrder = (id: string) => {
  return useQuery({
    queryKey: queryKeys.adminOrder(id),
    queryFn: () => getAdminOrder(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
    retry: false,
  });
};
