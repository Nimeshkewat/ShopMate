import { fetchProductReviews } from "@/api/reviewApi";
import { useQuery } from "@tanstack/react-query";

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchProductReviews(productId),
    enabled: !!productId,
    staleTime: 60 * 1000,
  });
};
