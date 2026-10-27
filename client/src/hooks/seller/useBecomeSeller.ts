import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { becomeSeller } from "@/api/seller/sellerApi";

export function useBecomeSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: becomeSeller,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.profile }),
  });
}
