import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { useAuth } from "@/context/AuthContext";
import { fetchOrderDetail } from "@/api/orderApi";

export function useOrder(id: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => fetchOrderDetail(id),
    enabled: isAuthenticated && !!id,
  });
}
