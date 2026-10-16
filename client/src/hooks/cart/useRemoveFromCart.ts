import type { ApiError } from "@/api/apiError";
import { removeFromCart } from "@/api/cartApi";
import type { CartActionResponse } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RemoveFromCartParams {
  productId: string;
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartActionResponse, ApiError, RemoveFromCartParams>({
    mutationFn: ({ productId }) => removeFromCart({ productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
