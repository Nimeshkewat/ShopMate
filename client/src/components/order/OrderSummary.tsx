import type { ReactNode } from "react";
import type { CartItem } from "../../types/cart";
import { formatPrice, type OrderTotals } from "../../utils/index";

interface Props {
  totals: OrderTotals;
  items?: CartItem[];
  children?: ReactNode;
}

export default function OrderSummary({ totals, items, children }: Props) {
  return (
    <div className="rounded-xl border border-primary/15 bg-primary/10 p-5">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      {items && (
        <ul className="mt-3 space-y-3 border-b border-primary/15 pb-4">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3">
              <img
                src={item.image}
                alt=""
                className="size-10 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-sm font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">
            Subtotal
            {!items &&
              ` (${totals.itemCount} ${totals.itemCount === 1 ? "item" : "items"})`}
          </dt>
          <dd className="font-medium">{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd
            className={
              totals.shipping === 0
                ? "font-medium text-emerald-500"
                : "font-medium"
            }
          >
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Tax</dt>
          <dd className="font-medium">{formatPrice(totals.tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-primary/15 pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd className="text-primary">{formatPrice(totals.total)}</dd>
        </div>
      </dl>

      {children && <div className="mt-5 space-y-3">{children}</div>}
    </div>
  );
}
