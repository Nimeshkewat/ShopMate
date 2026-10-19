import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import type { ApiError } from "@/api/apiError";
import { deleteShippingInfo } from "@/api/shippingApi";
import type { DeleteShippingResponse } from "@/types/shipping";

export function useDeleteShippingInfo() {
  const queryClient = useQueryClient();

  return useMutation<DeleteShippingResponse, ApiError, { id: string }>({
    mutationFn: ({ id }) => deleteShippingInfo(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.shipping }),
  });
}
