import { removeFromWishlist } from "@/api/wishlistApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist }),
  });
};
