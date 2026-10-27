import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { useAuth } from "@/context/AuthContext";
import { fetchOrders } from "@/api/orderApi";

export function useMyOrders() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: fetchOrders,
    enabled: isAuthenticated,
  });
}
