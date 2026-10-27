import { unblockUser } from "@/api/admin/adminUserManagementApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unblockUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminUsers(),
      });
    },
  });
};
