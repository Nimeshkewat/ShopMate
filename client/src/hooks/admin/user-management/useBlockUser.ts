import { blockUser } from "@/api/admin/adminUserManagementApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blockUser(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminUsers(),
      });
    },
  });
};
