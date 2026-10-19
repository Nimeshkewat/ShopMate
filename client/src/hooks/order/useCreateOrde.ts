import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { createOrder } from "@/api/orderApi";
import type { CreateOrderPayload, CreateOrderResponse } from "@/types/order";
import type { ApiError } from "@/api/apiError";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<CreateOrderResponse, ApiError, CreateOrderPayload>({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}
