import { approveSeller } from "@/api/admin/adminSellerManagementApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApproveSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => approveSeller(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminPendingSellers,
      });
    },
  });
};
