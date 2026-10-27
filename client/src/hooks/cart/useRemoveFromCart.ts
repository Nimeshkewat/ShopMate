import { removeFromCart } from "@/api/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RemoveFromCartParams {
  productId: string;
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId }: RemoveFromCartParams) =>
      removeFromCart({ productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
