import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onChange: (items: CartItem[]) => void;
}

const qtyButton =
  "size-7 rounded-md border-primary/20 bg-primary/15 text-primary hover:bg-primary hover:text-primary-foreground";

function CartSheet({ open, onOpenChange, items, onChange }: Props) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const changeQty = (id: string, delta: number) =>
    onChange(
      items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-white/20 bg-background/40 p-0 backdrop-blur-xl sm:max-w-md [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-lg [&>button]:bg-primary/15 [&>button]:p-1.5 [&>button]:text-primary"
      >
        <SheetHeader className="p-5 pb-4">
          <SheetTitle className="text-xl text-primary">
            Shopping Cart
          </SheetTitle>
          <SheetDescription className="sr-only">
            Items in your cart
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
            <ShoppingBag className="size-12 text-muted-foreground" />
            <p className="font-medium">Your cart is empty</p>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <Link to="/products">Browse products</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-primary/15 bg-primary/10 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-sm text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className={qtyButton}
                        onClick={() => changeQty(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="w-5 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className={qtyButton}
                        onClick={() => changeQty(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => remove(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-white/10 p-5">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="h-11 w-full text-base">
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

export default CartSheet;
