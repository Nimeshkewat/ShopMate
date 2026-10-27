import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { verifyPayment } from "@/api/paymentApi";

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyPayment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.orders }),
  });
}
