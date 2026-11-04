import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/index";
import type { CartItem } from "@/types/cart";

interface Props {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const qtyButton =
  "size-7 rounded-md border-border/60 text-foreground hover:bg-secondary";

export default function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: Props) {
  return (
    <li className="flex flex-col gap-4 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/60 transition-all sm:flex-row sm:items-center">
      <Link
        to={`/product/${item.productId}`}
        className="flex min-w-0 flex-1 items-center gap-4 group"
      >
        <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-secondary/50 p-1 ring-1 ring-border/40">
          <img
            src={item.image}
            alt={item.name}
            className="size-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {item.name}
          </p>
          <p className="mt-1 text-sm font-bold text-primary">
            {formatPrice(item.price)}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className={qtyButton}
            disabled={item.quantity <= 1}
            onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="size-3.5" />
          </Button>
          <span className="w-6 text-center text-sm font-medium tabular-nums">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className={qtyButton}
            onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="ml-1 size-7 rounded-md border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/15 hover:border-destructive/50"
            onClick={() => onRemove(item.productId)}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
        <span className="min-w-20 text-right text-sm font-semibold tabular-nums text-foreground">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
    </li>
  );
}
