import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";

const STEPS: {
  status: Exclude<OrderStatus, "Cancelled">;
  description: string;
}[] = [
  { status: "Processing", description: "We're preparing your order." },
  { status: "Shipped", description: "Your order is on its way." },
  { status: "Delivered", description: "Your order has been delivered." },
];

function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === "Cancelled") {
    return (
      <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
        This order was cancelled.
      </p>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.status === status);

  return (
    <ol>
      {STEPS.map((step, i) => {
        const done = i <= currentIndex;
        return (
          <li key={step.status} className="relative flex gap-3 pb-6 last:pb-0">
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "absolute left-3.75 top-8 h-[calc(100%-2rem)] w-0.5",
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
                className={cn("font-medium", !done && "text-muted-foreground")}
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
  );
}

export default OrderTimeline;
