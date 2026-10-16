import type { ApiError } from "@/api/apiError";
import { createReview } from "@/api/reviewApi";
import type { CreateReviewInput, ReviewActionResponse } from "@/types/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation<ReviewActionResponse, ApiError, CreateReviewInput>({
    mutationFn: createReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });
    },
  });
};
