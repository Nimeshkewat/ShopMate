import { getAdminDashboard } from "@/api/admin/adminDashboardApi";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: queryKeys.adminDashboard,
    queryFn: getAdminDashboard,
    staleTime: 5 * 60 * 1000,
  });
};
