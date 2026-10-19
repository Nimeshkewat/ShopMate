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
  "size-8 rounded-md border-primary/20 bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground";

export default function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: Props) {
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-primary/15 bg-primary/10 p-4 sm:flex-row sm:items-center">
      <Link
        to={`/product/${item.productId}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <img
          src={item.image}
          alt={item.name}
          className="size-20 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="line-clamp-2 font-medium hover:text-primary">
            {item.name}
          </p>
          <p className="mt-1 font-semibold text-primary">
            {formatPrice(item.price)}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={qtyButton}
            disabled={item.quantity <= 1}
            onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-6 text-center font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className={qtyButton}
            onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-md border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
            onClick={() => onRemove(item.productId)}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
        <span className="min-w-20 text-right font-semibold">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
    </li>
  );
}
