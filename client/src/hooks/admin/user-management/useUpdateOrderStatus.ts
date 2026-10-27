import { updateOrderStatus } from "@/api/admin/adminUserManagementApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderStatus = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => updateOrderStatus(id),
    onSuccess: async () => {
      await queryCLient.invalidateQueries({
        queryKey: queryKeys.adminUser(),
      });
    },
  });
};
