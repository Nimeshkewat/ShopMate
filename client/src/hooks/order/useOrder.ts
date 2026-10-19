import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { useAuth } from "@/context/AuthContext";
import { fetchOrderDetail } from "@/api/orderApi";
import type { OrderDetailResponse } from "@/types/order";

export function useOrder(id: string) {
  const { isAuthenticated } = useAuth();

  return useQuery<OrderDetailResponse, ApiError>({
    queryKey: queryKeys.order(id),
    queryFn: () => fetchOrderDetail(id),
    enabled: isAuthenticated && !!id,
  });
}
