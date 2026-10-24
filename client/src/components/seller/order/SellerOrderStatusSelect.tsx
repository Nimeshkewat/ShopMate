import type { OrderStatus } from "@/types/order";
import type { NextOrderStatus } from "@/types/seller";

// orders only move forward one step at a time, same as the backend
const NEXT: Partial<Record<OrderStatus, NextOrderStatus>> = {
  Processing: "Shipped",
  Shipped: "Delivered",
};

interface Props {
  status: OrderStatus;
  onChange: (next: NextOrderStatus) => void;
  disabled?: boolean;
}

function SellerOrderStatusSelect({ status, onChange, disabled }: Props) {
  const next = NEXT[status];

  return (
    <select
      aria-label="Update order status"
      value={status}
      disabled={disabled || !next}
      onChange={(e) => onChange(e.target.value as NextOrderStatus)}
      className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <option value={status}>{status}</option>
      {next && <option value={next}>{next}</option>}
    </select>
  );
}
export default SellerOrderStatusSelect;
