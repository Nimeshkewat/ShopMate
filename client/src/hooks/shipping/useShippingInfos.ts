import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { useAuth } from "@/context/AuthContext";
import { fetchShippingInfos } from "@/api/shippingApi";

export function useShippingInfos() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.shipping,
    queryFn: fetchShippingInfos,
    enabled: isAuthenticated,
  });
}
