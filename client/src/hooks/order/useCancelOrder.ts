import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { cancelOrder } from "@/api/orderApi";
import type { CancelOrderResponse } from "@/types/order";
import type { ApiError } from "@/api/apiError";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation<CancelOrderResponse, ApiError, string>({
    mutationFn: cancelOrder,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      queryClient.invalidateQueries({ queryKey: queryKeys.order(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}
