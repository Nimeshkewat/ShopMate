import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { becomeSeller } from "@/api/seller/sellerApi";
import type { BecomeSellerPayload, BecomeSellerResponse } from "@/types/seller";

export function useBecomeSeller() {
  const queryClient = useQueryClient();

  return useMutation<BecomeSellerResponse, ApiError, BecomeSellerPayload>({
    mutationFn: becomeSeller,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.profile }),
  });
}
