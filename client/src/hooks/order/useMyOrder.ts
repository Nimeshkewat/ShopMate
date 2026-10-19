import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { useAuth } from "@/context/AuthContext";
import { fetchOrders } from "@/api/orderApi";
import type { OrdersResponse } from "@/types/order";

export function useMyOrders() {
  const { isAuthenticated } = useAuth();

  return useQuery<OrdersResponse, ApiError>({
    queryKey: queryKeys.orders,
    queryFn: fetchOrders,
    enabled: isAuthenticated,
  });
}
