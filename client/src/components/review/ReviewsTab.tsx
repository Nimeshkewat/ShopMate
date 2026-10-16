import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/api/apiClient";
import { useCreateReview } from "@/hooks/review/useCreateReview";
import { useProductReviews } from "@/hooks/review/useProductReviews";
import { cn } from "@/lib/utils";
import RatingStars from "./RatingStars";

export default function ReviewsTab({ productId }: { productId: string }) {
  const { data, isLoading } = useProductReviews(productId);
  const createReview = useCreateReview();
  const reviews = data?.reviews ?? [];

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      const res = await createReview.mutateAsync({
        productId,
        rating,
        comment: comment.trim(),
      });
      toast.success(res?.message || "Review submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      // e.g. "You can only review a product you've purchased"
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold">Leave a Review</h2>

        <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHovered(n)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              aria-pressed={rating === n}
            >
              <Star
                className={cn(
                  "size-7 transition-colors",
                  n <= (hovered || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/40",
                )}
              />
            </button>
          ))}
        </div>

        <div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product"
            maxLength={300}
            className="min-h-28 bg-background/50"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {comment.length}/300
          </p>
        </div>

        <Button
          type="submit"
          loading={createReview.isPending}
          loadingText="Submitting Review..."
        >
          Submit Review
        </Button>
      </form>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Customer Reviews</h2>
        {isLoading ? (
          <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
            <Spinner size="sm" className="text-primary" />
            <span>Loading reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No reviews yet. Be the first to review this product.
          </p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="flex gap-3 rounded-xl border border-primary/15 bg-background/40 p-4"
              >
                {review.userId.avatar ? (
                  <img
                    src={review.userId.avatar}
                    alt=""
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-amber-400 font-semibold text-amber-950">
                    {review.userId.username.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-medium">{review.userId.username}</p>
                    <RatingStars rating={review.rating} className="size-3.5" />
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={review.createdAt}
                    >
                      {new Date(review.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  {review.comment && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
