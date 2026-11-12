import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import { useClearWishlist } from "@/hooks/wishlist/useClearWishlist";
import { useRemoveWishlist } from "@/hooks/wishlist/useRemoveWishlist";
import { useWishlist } from "@/hooks/wishlist/useWishlist";
import { formatPrice } from "@/utils/index";

function Wishlist() {
  const { data, isLoading, isError, error, refetch } = useWishlist();
  const removeWishlist = useRemoveWishlist();
  const clearWishlist = useClearWishlist();
  const products = data?.wishlist.products ?? [];

  if (isLoading) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-10 text-muted-foreground sm:px-6">
        Loading your wishlist...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-muted-foreground">{getErrorMessage(error)}</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center">
        <Heart className="size-10 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground">
          Save products you like and find them here later.
        </p>
        <Button className="mt-2">
          <Link to="/products">Browse products</Link>
        </Button>
      </div>
    );
  }

  const handleError = (error: unknown) => toast.error(getErrorMessage(error));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        <Button
          variant="outline"
          disabled={clearWishlist.isPending}
          onClick={() =>
            clearWishlist.mutate(undefined, {
              onSuccess: () => toast.success("Wishlist cleared"),
              onError: handleError,
            })
          }
        >
          <Trash2 className="size-4" />
          Clear wishlist
        </Button>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li
            key={product._id}
            className="overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border/60"
          >
            <Link
              to={`/product/${product._id}`}
              className="block aspect-4/3 bg-secondary/40 p-4"
            >
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="size-full object-contain"
              />
            </Link>
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <Link
                  to={`/product/${product._id}`}
                  className="line-clamp-2 font-semibold hover:text-primary"
                >
                  {product.name}
                </Link>
                <p className="mt-1 font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                {product.stock === 0 && (
                  <p className="mt-1 text-sm text-destructive">Out of stock</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove ${product.name} from wishlist`}
                disabled={removeWishlist.isPending || clearWishlist.isPending}
                onClick={() =>
                  removeWishlist.mutate(product._id, {
                    onSuccess: () => toast.success("Removed from wishlist"),
                    onError: handleError,
                  })
                }
              >
                <Trash2 className="size-4 text-destructive" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;
