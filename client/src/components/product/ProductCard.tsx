import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardData {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  isNew?: boolean;
}

const getStockInfo = (stock: number) => {
  if (stock === 0)
    return {
      label: "Out of Stock",
      className: "bg-red-500/15 text-red-600 dark:text-red-400",
    };
  if (stock <= 5)
    return {
      label: "Limited Stock",
      className: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    };
  return {
    label: "In Stock",
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  };
};

interface Props {
  product: ProductCardData;
  onAddToCart?: (product: ProductCardData) => void;
}

function ProductCard({ product, onAddToCart }: Props) {
  const stock = getStockInfo(product.stock);
  const isTopRated = product.rating >= 4.5;
  const href = `/product/${product.id}`;

  return (
    <article className="group h-full rounded-xl border border-primary/15 bg-primary/10 p-3 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/15">
      <div className="relative">
        <Link
          to={href}
          className="block aspect-square overflow-hidden rounded-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
          {product.isNew && (
            <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              NEW
            </span>
          )}
          {isTopRated && (
            <span className="rounded bg-linear-to-r from-amber-500 to-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
              TOP RATED
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock === 0}
          className="absolute bottom-2 right-2 grid size-9 place-items-center rounded-lg bg-primary/15 text-primary backdrop-blur transition hover:bg-primary hover:text-primary-foreground focus-visible:opacity-100 disabled:hidden md:opacity-0 md:group-hover:opacity-100"
        >
          <ShoppingCart className="size-4" />
        </button>
      </div>

      <Link to={href} className="mt-3 block">
        <h3 className="line-clamp-2 min-h-11 font-semibold leading-snug transition-colors group-hover:text-primary">
          {product.name}
        </h3>
      </Link>

      <div
        className="mt-1 flex items-center gap-1"
        aria-label={`Rated ${product.rating} out of 5`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < Math.round(product.rating)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/40",
            )}
          />
        ))}
        <span className="ml-1 text-xs text-muted-foreground">
          ({product.reviewCount})
        </span>
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

export default ProductCard;
