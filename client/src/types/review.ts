export interface ReviewUser {
  _id: string;
  username: string;
  avatar?: string;
}

export interface Review {
  _id: string;
  userId: ReviewUser;
  productId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewsResponse {
  success: boolean;
  reviews: Review[];
}

export interface CreateReviewInput {
  productId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewInput {
  reviewId: string;
  rating?: number;
  comment?: string;
}

export interface ReviewActionResponse {
  success: boolean;
  message: string;
  review?: Review;
}
