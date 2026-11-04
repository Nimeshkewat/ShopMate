import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
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
    } catch {
      toast.error("You can only review a product you've purchased");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <h2 className="text-base font-semibold text-foreground">Leave a Review</h2>

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
                  "size-6 transition-colors",
                  n <= (hovered || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30",
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
            className="min-h-24 bg-background text-sm ring-1 ring-border/60"
          />
          <p className="mt-1 text-right text-[11px] text-muted-foreground">
            {comment.length}/300
          </p>
        </div>

        <Button
          type="submit"
          size="sm"
          loading={createReview.isPending}
          loadingText="Submitting Review..."
        >
          Submit Review
        </Button>
      </form>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">Customer Reviews</h2>
        {isLoading ? (
          <div className="flex items-center gap-2 py-4 text-xs text-muted-foreground">
            <Spinner size="xs" className="text-primary" />
            <span>Loading reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            No reviews yet. Be the first to review this product.
          </p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="flex gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/60"
              >
                {review.userId.avatar ? (
                  <img
                    src={review.userId.avatar}
                    alt=""
                    className="size-8 shrink-0 rounded-full object-cover ring-1 ring-border/60"
                  />
                ) : (
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {review.userId.username.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <p className="text-xs font-semibold text-foreground">{review.userId.username}</p>
                    <RatingStars rating={review.rating} className="size-3" />
                    <time
                      className="text-[11px] text-muted-foreground"
                      dateTime={review.createdAt}
                    >
                      {new Date(review.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                  {review.comment && (
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
