import { Banknote, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShippingInfo } from "@/types/shipping";
import type { PaymentType } from "@/types/order";
import { formatPrice } from "@/utils/index";

const options: {
  value: PaymentType;
  label: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    value: "Online",
    label: "Pay Online",
    description: "Cards, UPI and net banking via Razorpay",
    icon: CreditCard,
  },
  {
    value: "CashOnDelivery",
    label: "Cash on Delivery",
    description: "Pay in cash when your order arrives",
    icon: Banknote,
  },
];

interface Props {
  address?: ShippingInfo;
  total: number;
  paymentType: PaymentType;
  onPaymentTypeChange: (type: PaymentType) => void;
  onChangeAddress: () => void;
  onPlaceOrder: () => void;
  isPlacing: boolean;
  isAddressLoading?: boolean;
}

function PaymentStep({
  address,
  total,
  paymentType,
  onPaymentTypeChange,
  onChangeAddress,
  onPlaceOrder,
  isPlacing,
  isAddressLoading,
}: Props) {
  return (
    <section className="space-y-5 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60 sm:p-6">
      <h2 className="text-base font-semibold text-foreground">Payment Method</h2>

      {address && (
        <div className="flex items-start justify-between gap-3 rounded-lg bg-secondary/50 p-3 ring-1 ring-border/50 text-xs">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Delivering to</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{address.fullname}</p>
            <p className="truncate text-muted-foreground">
              {address.address}, {address.city}
            </p>
          </div>
          <button
            type="button"
            onClick={onChangeAddress}
            className="shrink-0 text-xs font-semibold text-primary hover:underline"
          >
            Change
          </button>
        </div>
      )}

      {!address && (
        <p
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg border border-destructive/20 bg-destructive/8 px-3 py-2 text-xs font-medium text-destructive"
        >
          {isAddressLoading
            ? "Loading your address..."
            : "No delivery address selected."}
          {!isAddressLoading && (
            <button
              type="button"
              onClick={onChangeAddress}
              className="shrink-0 underline"
            >
              Choose address
            </button>
          )}
        </p>
      )}

      <div role="radiogroup" aria-label="Payment method" className="space-y-2.5">
        {options.map(({ value, label, description, icon: Icon }) => {
          const selected = paymentType === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onPaymentTypeChange(value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl p-3.5 text-left transition-all ring-1",
                selected
                  ? "bg-secondary/60 ring-primary shadow-sm"
                  : "bg-card ring-border/60 hover:bg-secondary/30",
              )}
            >
              <div className="grid size-9 place-items-center rounded-lg bg-secondary text-primary shrink-0 ring-1 ring-border/40">
                <Icon className="size-4" />
              </div>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">{label}</span>
                <span className="block text-xs text-muted-foreground">
                  {description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <Button
        className="h-11 w-full text-sm font-semibold shadow-sm"
        onClick={onPlaceOrder}
        disabled={isPlacing || !address}
      >
        {isPlacing
          ? "Placing order..."
          : paymentType === "Online"
            ? `Pay ${formatPrice(total)}`
            : `Place Order · ${formatPrice(total)}`}
      </Button>
    </section>
  );
}

export default PaymentStep;
