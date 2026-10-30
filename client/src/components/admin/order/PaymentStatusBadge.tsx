import { cn } from "@/lib/utils";
import type { PaymentType } from "@/types/order";
import type { PaymentStatus } from "@/types/payment";

const statusStyles: Record<PaymentStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Paid: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Failed: "bg-red-500/15 text-red-600 dark:text-red-400",
  Refunded: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
};

export const paymentTypeLabel = (type: PaymentType) =>
  type === "Online" ? "Online" : "Cash on Delivery";

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-block rounded-md px-2.5 py-1 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}

export default PaymentStatusBadge;
