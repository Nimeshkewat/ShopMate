import { addToCart } from "@/api/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddToCartParams {
  productId: string;
  quantity?: number;
}

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity = 1 }: AddToCartParams) =>
      addToCart({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
