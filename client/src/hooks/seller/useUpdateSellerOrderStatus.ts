import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { updateSellerOrderStatus } from "@/api/seller/sellerOrdersApi";

export function useUpdateSellerOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSellerOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sellerOrders });
      queryClient.invalidateQueries({ queryKey: queryKeys.sellerDashboard });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders }); //* the buyer's My Orders
    },
  });
}
