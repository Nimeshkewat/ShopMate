import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";
import { STATUS_STYLES } from "@/utils/constants";

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { icon: Icon, className } = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      <Icon className="size-4" />
      {status}
    </span>
  );
}

export default OrderStatusBadge;
