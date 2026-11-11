import { clearWishlist } from "@/api/wishlistApi";
import { queryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useClearWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearWishlist,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist }),
  });
};
