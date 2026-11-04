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
    <div className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
      <h2 className="text-base font-semibold text-foreground">Order Summary</h2>

      {items && (
        <ul className="mt-3 space-y-3 border-b border-border/60 pb-4">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3">
              <img
                src={item.image}
                alt=""
                className="size-10 shrink-0 rounded-md bg-secondary/50 object-contain p-0.5 ring-1 ring-border/40"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-foreground">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-xs font-semibold tabular-nums text-foreground">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">
            Subtotal
            {!items &&
              ` (${totals.itemCount} ${totals.itemCount === 1 ? "item" : "items"})`}
          </dt>
          <dd className="font-semibold text-foreground tabular-nums">{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd
            className={
              totals.shipping === 0
                ? "font-semibold text-emerald-600 dark:text-emerald-400"
                : "font-semibold text-foreground tabular-nums"
            }
          >
            {totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Tax</dt>
          <dd className="font-semibold text-foreground tabular-nums">{formatPrice(totals.tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-border/60 pt-3 text-sm font-semibold">
          <dt className="text-foreground">Total</dt>
          <dd className="text-base font-bold text-primary tabular-nums">{formatPrice(totals.total)}</dd>
        </div>
      </dl>

      {children && <div className="mt-5 space-y-3">{children}</div>}
    </div>
  );
}
