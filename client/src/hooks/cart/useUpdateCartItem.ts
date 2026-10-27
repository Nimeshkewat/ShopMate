import { updateCartItem } from "@/api/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCartItemParams {
  productId: string;
  quantity: number;
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }: UpdateCartItemParams) =>
      updateCartItem({ productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
