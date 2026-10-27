import { getUser } from "@/api/admin/adminUserManagementApi";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.adminUser(id),
    queryFn: () => getUser(id),
  });
};
