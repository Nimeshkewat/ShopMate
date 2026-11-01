import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CartItem } from "@/types/cart";
import { useClearCart } from "@/hooks/cart/useClearCart";
import { CURRENCY } from "@/utils/constants";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  isLoading?: boolean;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartSheet({
  open,
  onOpenChange,
  items,
  isLoading,
  onQuantityChange,
  onRemove,
}: Props) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const { mutate: clearCart, isPending } = useClearCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border/60 bg-card p-0 shadow-xl sm:max-w-md [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-lg [&>button]:bg-secondary [&>button]:p-1.5 [&>button]:text-muted-foreground"
      >
        <SheetHeader className="border-b border-border/60 p-5">
          <SheetTitle className="text-base font-semibold text-foreground">
            Shopping Cart
            {items.length > 0 && (
              <span className="ml-2 rounded-full bg-primary/12 px-2 py-0.5 text-xs font-medium text-primary">
                {items.length}
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Items in your cart
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-12 text-muted-foreground">
            <Spinner size="lg" className="text-primary" />
            <p className="text-sm">Loading your cart...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-secondary">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add items to get started
            </p>
            <Button variant="outline" size="sm" className="mt-1">
              <Link to="/products" onClick={() => onOpenChange(false)}>
                Browse products
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-2.5 overflow-y-auto p-4">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex gap-3 rounded-xl bg-background p-3 ring-1 ring-border/60"
                >
                  <div className="size-16 shrink-0 overflow-hidden rounded-lg bg-secondary/60">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-primary">
                      {CURRENCY}
                      {item.price}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-6 rounded-md border-border/60 text-xs"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          onQuantityChange(item.productId, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-5 text-center text-sm tabular-nums font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-6 rounded-md border-border/60 text-xs"
                        disabled={
                          item.stock ? item?.stock <= item.quantity : false
                        }
                        onClick={() =>
                          onQuantityChange(item.productId, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto size-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onRemove(item.productId)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-border/60 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    {CURRENCY}
                    {total}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="text-xs text-muted-foreground transition-colors hover:text-destructive"
                >
                  {isPending ? "Clearing..." : "Clear cart"}
                </button>
              </div>
              <Button className="h-10 w-full font-semibold">
                <Link to="/cart" onClick={() => onOpenChange(false)}>
                  View Cart & Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
