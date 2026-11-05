import { Link } from "react-router-dom";
import { ImageOff, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useAddToCartAction } from "@/hooks/cart/useAddToCartAction";
import type { Product } from "../../types/product";
import { getStockStatus, isNewProduct, stockBadge } from "../../utils/index";
import RatingStars from "../review/RatingStars";
import { CURRENCY } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isPending } = useAddToCartAction();
  const { isAuthenticated, setAuthOpen } = useAuth();
  const stock = stockBadge[getStockStatus(product.stock)];
  const href = `/product/${product._id}`;
  const image = product.images[0]?.url;

  return (
    <article className="group h-full rounded-xl bg-card p-3 shadow-sm ring-1 ring-border/60 transition-all duration-200 hover:shadow-md hover:ring-primary/30">
      <div className="relative">
        <Link
          to={href}
          className="block aspect-square overflow-hidden rounded-lg bg-secondary/50"
        >
          {image ? (
            <img
              src={image}
              alt={product.name}
              loading="lazy"
              className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <ImageOff className="size-8" />
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {isNewProduct(product) && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-sm">
              NEW
            </span>
          )}
          {product.rating >= 4.5 && (
            <span className="rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              TOP RATED
            </span>
          )}
        </div>

        {/* Quick add to cart */}
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => {
            if (!isAuthenticated) setAuthOpen(true);
            addToCart(product._id);
          }}
          disabled={isPending}
          className={cn(
            "absolute bottom-2 right-2 grid size-8 place-items-center rounded-lg bg-card/90 text-primary shadow-sm backdrop-blur ring-1 ring-border/60 transition-all hover:bg-primary hover:text-primary-foreground hover:ring-primary focus-visible:opacity-100 disabled:opacity-50 md:opacity-0 md:group-hover:opacity-100",
            product.stock === 0 && "hidden",
          )}
        >
          {isPending ? (
            <Spinner size="xs" />
          ) : (
            <ShoppingCart className="size-3.5" />
          )}
        </button>
      </div>

      <Link to={href} className="mt-3 block">
        <h3 className="line-clamp-2 min-h-11 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
      </Link>

      <div className="mt-1.5 flex items-center gap-1">
        <RatingStars rating={product.rating} className="size-3" />
        {product.reviewCount !== undefined && (
          <span className="ml-0.5 text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        )}
      </div>

      <p className="mt-2 text-base font-bold text-primary">
        {CURRENCY}
        {product.price.toFixed(0)}
      </p>
      <span
        className={cn(
          "mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
          stock.className,
        )}
      >
        {stock.label}
      </span>
    </article>
  );
}
