import type { ApiError } from "@/api/apiError";
import { clearCart } from "@/api/cartApi";
import type { CartActionResponse } from "@/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartActionResponse, ApiError, void>({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
