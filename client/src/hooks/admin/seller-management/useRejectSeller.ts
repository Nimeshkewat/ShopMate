import { rejectSeller } from "@/api/admin/adminSellerManagementApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRejectSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rejectSeller(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminPendingSellers,
      });
    },
  });
};
