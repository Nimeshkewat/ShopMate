import { ImageOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getStockStatus, stockBadge } from "@/utils";
import type { Product } from "@/types/product";
import { CURRENCY } from "@/utils/constants";

export interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
  const stock = stockBadge[getStockStatus(product.stock)];
  const image = product.images[0]?.url;

  return (
    <article className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm ring-1 ring-border/60 transition-all hover:shadow-md hover:ring-primary/25 sm:gap-4">
      {/* Thumbnail */}
      <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-secondary/60 sm:size-14">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="size-full object-contain"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <ImageOff className="size-4 sm:size-5" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </p>
        <p className="truncate text-xs text-muted-foreground mt-0.5">
          {product.category}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-primary">
            {CURRENCY}
            {product.price.toFixed(2)}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
              stock.className,
            )}
          >
            {stock.label}
          </span>
          <span className="text-[11px] text-muted-foreground">
            Qty: {product.stock}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-1.5">
        <Button
          variant="outline"
          size="icon"
          aria-label={`Edit ${product.name}`}
          onClick={() => onEdit(product)}
          className="size-8 sm:size-8 border-border/60 hover:border-primary/40 hover:text-primary"
        >
          <Pencil className="size-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Delete ${product.name}`}
          onClick={() => onDelete(product)}
          className="size-8 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
    </article>
  );
}

export default ProductRow;
