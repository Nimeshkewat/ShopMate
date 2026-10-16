import { Link } from "react-router-dom";
import { ImageOff, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useAddToCartAction } from "@/hooks/cart/useAddToCartAction";
import type { Product } from "../../types/product";
import { getStockStatus, isNewProduct, stockBadge } from "../../utils/index";
import RatingStars from "../review/RatingStars";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isPending } = useAddToCartAction();
  const stock = stockBadge[getStockStatus(product.stock)];
  const href = `/product/${product._id}`;
  const image = product.images[0]?.url;

  return (
    <article className="group h-full rounded-xl border border-primary/15 bg-primary/10 p-3 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/15">
      <div className="relative">
        <Link
          to={href}
          className="block aspect-square overflow-hidden rounded-lg"
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

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {isNewProduct(product) && (
            <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              NEW
            </span>
          )}
          {product.rating >= 4.5 && (
            <span className="rounded bg-gradient-to-r from-amber-500 to-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
              TOP RATED
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => addToCart(product._id)}
          disabled={isPending}
          className={cn(
            "absolute bottom-2 right-2 grid size-9 place-items-center rounded-lg bg-primary/15 text-primary backdrop-blur transition hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 disabled:opacity-50 md:opacity-0 md:group-hover:opacity-100",
            product.stock === 0 && "hidden",
          )}
        >
          {isPending ? (
            <Spinner size="xs" />
          ) : (
            <ShoppingCart className="size-4" />
          )}
        </button>
      </div>

      <Link to={href} className="mt-3 block">
        <h3 className="line-clamp-2 min-h-[2.75rem] font-semibold leading-snug transition-colors group-hover:text-primary">
          {product.name}
        </h3>
      </Link>

      <div className="mt-1 flex items-center gap-1">
        <RatingStars rating={product.rating} className="size-3.5" />
        {product.reviewCount !== undefined && (
          <span className="ml-1 text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        )}
      </div>

      <p className="mt-2 text-lg font-bold text-primary">
        ${product.price.toFixed(2)}
      </p>
      <span
        className={cn(
          "mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium",
          stock.className,
        )}
      >
        {stock.label}
      </span>
    </article>
  );
}
