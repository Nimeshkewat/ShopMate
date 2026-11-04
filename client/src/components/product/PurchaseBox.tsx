import { useState } from "react";
import {
  Heart,
  IndianRupee,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  stock: number;
  isPending?: boolean;
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
}

const qtyButton =
  "size-8 rounded-lg border-border/60 text-foreground hover:bg-secondary";

export default function PurchaseBox({
  name,
  stock,
  isPending = false,
  onAddToCart,
  onBuyNow,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false); // TODO: connect to your wishlist hook
  const outOfStock = stock === 0;

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // the user closed the share sheet
    }
  };

  return (
    <div className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quantity:</span>
        <Button
          variant="outline"
          size="icon"
          className={qtyButton}
          disabled={outOfStock || quantity <= 1}
          onClick={() => setQuantity((q) => q - 1)}
          aria-label="Decrease quantity"
        >
          <Minus className="size-3.5" />
        </Button>
        <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className={qtyButton}
          disabled={outOfStock || quantity >= stock}
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="size-3.5" />
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button
          className="h-11 text-sm font-semibold shadow-sm"
          disabled={outOfStock}
          loading={isPending}
          loadingText="Adding to Cart..."
          onClick={() => onAddToCart(quantity)}
        >
          <ShoppingCart className="size-4" />
          Add to Cart
        </Button>
        <Button
          variant="secondary"
          className="h-11 text-sm font-semibold"
          disabled={outOfStock}
          loading={isPending}
          loadingText="Processing..."
          onClick={() => onBuyNow(quantity)}
        >
          <IndianRupee className="size-4" />
          Buy Now
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground border-t border-border/60 pt-3">
        <button
          type="button"
          onClick={() => setWishlisted((w) => !w)}
          aria-pressed={wishlisted}
          className="flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <Heart
            className={cn("size-3.5", wishlisted && "fill-red-500 text-red-500")}
          />
          {wishlisted ? "In Wishlist" : "Add to Wishlist"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <Share2 className="size-3.5" />
          Share
        </button>
      </div>
    </div>
  );
}
