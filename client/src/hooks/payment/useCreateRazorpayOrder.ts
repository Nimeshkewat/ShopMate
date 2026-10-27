import { useMutation } from "@tanstack/react-query";
import { createRazorpayOrder } from "@/api/paymentApi";

export function useCreateRazorpayOrder() {
  return useMutation({
    mutationFn: createRazorpayOrder,
  });
}
