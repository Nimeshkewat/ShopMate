import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { addShippingInfo } from "@/api/shippingApi";
import type {
  ShippingInfoResponse,
  ShippingInfosResponse,
} from "@/types/shipping";
import type { ShippingValues } from "@/schema/shipping";

export function useAddShippingInfo() {
  const queryClient = useQueryClient();

  return useMutation<ShippingInfoResponse, ApiError, ShippingValues>({
    mutationFn: addShippingInfo,
    onSuccess: (data) => {
      queryClient.setQueryData<ShippingInfosResponse>(
        queryKeys.shipping,
        (old) => {
          const next = data.shippingInfo;
          const existing = old?.shippingInfos ?? [];
          if (!next || existing.some((a) => a._id === next._id)) {
            return old ?? { success: true, shippingInfos: existing };
          }
          return { success: true, shippingInfos: [...existing, next] };
        },
      );
      void queryClient.invalidateQueries({ queryKey: queryKeys.shipping });
    },
  });
}
