import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { useAuth } from "@/context/AuthContext";
import { fetchShippingInfos } from "@/api/shippingApi";
import type { ShippingInfosResponse } from "@/types/shipping";
import type { ApiError } from "@/api/apiError";

export function useShippingInfos() {
  const { isAuthenticated } = useAuth();

  return useQuery<ShippingInfosResponse, ApiError>({
    queryKey: queryKeys.shipping,
    queryFn: fetchShippingInfos,
    enabled: isAuthenticated,
  });
}
