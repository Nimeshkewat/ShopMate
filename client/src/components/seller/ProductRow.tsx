import { ImageOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getStockStatus, stockBadge } from "@/utils";
import type { Product } from "@/types/product";

export interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
  const stock = stockBadge[getStockStatus(product.stock)];
  const image = product.images[0]?.url;

  return (
    <article className="flex items-center gap-2 rounded-xl border border-primary/15 bg-primary/10 p-2.5 transition-shadow hover:shadow-md hover:shadow-primary/10 sm:gap-4 sm:p-3">
      {/* Thumbnail */}
      <div className="size-12 shrink-0 overflow-hidden rounded-lg sm:size-16">
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
        <p className="truncate text-sm font-semibold leading-snug sm:text-base">
          {product.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">{product.category}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <span
            className={cn(
              "rounded px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:text-xs",
              stock.className,
            )}
          >
            {stock.label}
          </span>
          <span className="text-[10px] text-muted-foreground sm:text-xs">
            Qty: {product.stock}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label={`Edit ${product.name}`}
          onClick={() => onEdit(product)}
          className="size-8 sm:size-9"
        >
          <Pencil className="size-3.5 sm:size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label={`Delete ${product.name}`}
          onClick={() => onDelete(product)}
          className="size-8 border-destructive/40 text-destructive hover:bg-destructive/10 sm:size-9"
        >
          <Trash2 className="size-3.5 sm:size-4" />
        </Button>
      </div>
    </article>
  );
}

export default ProductRow;
