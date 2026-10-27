import { approveSeller } from "@/api/admin/adminSellerManagementApi";
import type { ApiError } from "@/api/apiError";
import type { ApproveSellerResponse } from "@/types/admin";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApproveSeller = () => {
  const queryClient = useQueryClient();

  return useMutation<ApproveSellerResponse, ApiError, string>({
    mutationFn: (id: string) => approveSeller(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminPendingSeller(),
      });
    },
  });
};

