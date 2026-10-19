import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/api/apiError";
import { createRazorpayOrder } from "@/api/paymentApi";
import type {
  RazorpayOrderPayload,
  RazorpayOrderResponse,
} from "@/types/payment";

export function useCreateRazorpayOrder() {
  return useMutation<RazorpayOrderResponse, ApiError, RazorpayOrderPayload>({
    mutationFn: createRazorpayOrder,
  });
}
