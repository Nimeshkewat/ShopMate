import { api } from "./apiClient";
import type {
  CreateReviewInput,
  ReviewActionResponse,
  ReviewsResponse,
  UpdateReviewInput,
} from "@/types/review";

const BASE = "/reviews";

export const fetchProductReviews = async (
  productId: string,
): Promise<ReviewsResponse> => {
  const response = await api.get<ReviewsResponse>(
    `${BASE}/product/${productId}`,
  );
  return response.data;
};

export const createReview = async ({
  productId,
  rating,
  comment,
}: CreateReviewInput): Promise<ReviewActionResponse> => {
  const response = await api.post<ReviewActionResponse>(
    `${BASE}/${productId}`,
    { rating, comment },
  );
  return response.data;
};

export const updateReview = async ({
  reviewId,
  rating,
  comment,
}: UpdateReviewInput): Promise<ReviewActionResponse> => {
  const response = await api.patch<ReviewActionResponse>(
    `${BASE}/${reviewId}`,
    { rating, comment },
  );
  return response.data;
};

export const deleteReview = async (
  reviewId: string,
): Promise<ReviewActionResponse> => {
  const response = await api.delete<ReviewActionResponse>(
    `${BASE}/${reviewId}`,
  );
  return response.data;
};
