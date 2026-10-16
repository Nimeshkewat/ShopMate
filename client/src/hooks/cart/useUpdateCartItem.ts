import type { ApiError } from "@/api/apiError";
import { updateCartItem } from "@/api/cartApi";
import type { CartActionResponse } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCartItemParams {
  productId: string;
  quantity: number;
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<CartActionResponse, ApiError, UpdateCartItemParams>({
    mutationFn: ({ productId, quantity }) =>
      updateCartItem({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
