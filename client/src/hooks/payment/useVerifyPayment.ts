import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { verifyPayment } from "@/api/paymentApi";
import type {
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "@/types/payment";

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation<VerifyPaymentResponse, ApiError, VerifyPaymentPayload>({
    mutationFn: verifyPayment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.orders }),
  });
}
