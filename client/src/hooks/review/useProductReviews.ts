import type { ApiError } from "@/api/apiError";
import { fetchProductReviews } from "@/api/reviewApi";
import type { ReviewsResponse } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export const useProductReviews = (productId: string) => {
  return useQuery<ReviewsResponse, ApiError>({
    queryKey: ["reviews", productId],
    queryFn: () => fetchProductReviews(productId),
    enabled: !!productId,
    staleTime: 60 * 1000,
  });
};
