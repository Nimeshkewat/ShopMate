import type { ApiError } from "@/api/apiError";
import { addToCart } from "@/api/cartApi";
import type { CartActionResponse } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddToCartParams {
  productId: string;
  quantity?: number;
}

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartActionResponse, ApiError, AddToCartParams>({
    mutationFn: ({ productId, quantity = 1 }) =>
      addToCart({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
