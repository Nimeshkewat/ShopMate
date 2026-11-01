import { cn } from "@/lib/utils";
import type { PaymentType } from "@/types/order";
import type { PaymentStatus } from "@/types/payment";

const statusStyles: Record<PaymentStatus, string> = {
  Pending:
    "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-400 dark:bg-amber-500/15 dark:ring-amber-500/25",
  Paid: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/15 dark:ring-emerald-500/25",
  Failed:
    "bg-red-500/12 text-red-700 ring-1 ring-red-500/20 dark:text-red-400 dark:bg-red-500/15 dark:ring-red-500/25",
  Refunded:
    "bg-violet-500/12 text-violet-700 ring-1 ring-violet-500/20 dark:text-violet-400 dark:bg-violet-500/15 dark:ring-violet-500/25",
};

export const paymentTypeLabel = (type: PaymentType) =>
  type === "Online" ? "Online" : "Cash on Delivery";

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}

export default PaymentStatusBadge;
