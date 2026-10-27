import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys";
import { deleteShippingInfo } from "@/api/shippingApi";

export function useDeleteShippingInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteShippingInfo(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.shipping }),
  });
}
