import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Details", "Payment"];

function CheckoutStepper({ step }: { step: 1 | 2 }) {
  return (
    <ol
      className="flex items-center justify-center gap-4"
      aria-label="Checkout progress"
    >
      {steps.map((label, i) => {
        const number = i + 1;
        const done = step > number;
        const active = step === number;
        return (
          <li
            key={label}
            className="flex items-center gap-4"
            aria-current={active ? "step" : undefined}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-8 place-items-center rounded-full text-sm font-semibold",
                  active || done
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="size-4" /> : number}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </span>
            {i < steps.length - 1 && (
              <span className="h-px w-10 bg-border sm:w-16" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default CheckoutStepper;
