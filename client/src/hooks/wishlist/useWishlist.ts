import { fetchWishlist } from "@/api/wishlistApi";
import { useAuth } from "@/context/AuthContext";
import { queryKeys } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useWishlist = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: queryKeys.wishlist,
    queryFn: fetchWishlist,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
