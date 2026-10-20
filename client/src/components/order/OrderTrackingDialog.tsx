import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

const STEPS: {
  status: Exclude<OrderStatus, "Cancelled">;
  description: string;
}[] = [
  { status: "Processing", description: "We're preparing your order." },
  { status: "Shipped", description: "Your order is on its way." },
  { status: "Delivered", description: "Your order has been delivered." },
];

interface Props {
  order: Order | null;
  onOpenChange: (open: boolean) => void;
}

function OrderTrackingDialog({ order, onOpenChange }: Props) {
  const currentIndex = order
    ? STEPS.findIndex((s) => s.status === order.orderStatus)
    : -1;

  return (
    <Dialog open={!!order} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {order && (
          <>
            <DialogHeader className="text-left">
              <DialogTitle>Track Order</DialogTitle>
              <DialogDescription className="break-all">
                Order #{order._id}
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <OrderStatusBadge status={order.orderStatus} />
            </div>

            {order.orderStatus === "Cancelled" ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                This order was cancelled.
              </p>
            ) : (
              <ol className="mt-2">
                {STEPS.map((step, i) => {
                  const done = i <= currentIndex;
                  return (
                    <li
                      key={step.status}
                      className="relative flex gap-3 pb-6 last:pb-0"
                    >
                      {i < STEPS.length - 1 && (
                        <span
                          className={cn(
                            "absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5",
                            i < currentIndex ? "bg-primary" : "bg-border",
                          )}
                        />
                      )}
                      <span
                        className={cn(
                          "z-10 grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold",
                          done
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="size-4" /> : i + 1}
                      </span>
                      <div>
                        <p
                          className={cn(
                            "font-medium",
                            !done && "text-muted-foreground",
                          )}
                        >
                          {step.status}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OrderTrackingDialog;
