import { addToWishlist } from "@/api/wishlistApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist }),
  });
};
