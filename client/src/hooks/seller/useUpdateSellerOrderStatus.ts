import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { updateSellerOrderStatus } from "@/api/seller/sellerOrdersApi";
import type {
  UpdateOrderStatusPayload,
  UpdateOrderStatusResponse,
} from "@/types/seller";

export function useUpdateSellerOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateOrderStatusResponse,
    ApiError,
    UpdateOrderStatusPayload
  >({
    mutationFn: updateSellerOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sellerOrders });
      queryClient.invalidateQueries({ queryKey: queryKeys.sellerDashboard });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders }); //* the buyer's My Orders
    },
  });
}
