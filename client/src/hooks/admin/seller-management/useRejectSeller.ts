import { rejectSeller } from "@/api/admin/adminSellerManagementApi";
import type { ApiError } from "@/api/apiError";
import type { RejectSellerResponse } from "@/types/admin";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRejectSeller = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<RejectSellerResponse, ApiError, string>({
    mutationFn: () => rejectSeller(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.adminPendingSeller,
      });
    },
  });
};
