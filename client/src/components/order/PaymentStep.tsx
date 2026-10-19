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
    <section className="space-y-5 rounded-xl border border-primary/15 bg-primary/10 p-5 sm:p-6">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      {address && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-primary/15 bg-background/40 p-3 text-sm">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Delivering to</p>
            <p className="font-medium">{address.fullname}</p>
            <p className="truncate text-muted-foreground">
              {address.address}, {address.city}
            </p>
          </div>
          <button
            type="button"
            onClick={onChangeAddress}
            className="shrink-0 text-primary hover:underline"
          >
            Change
          </button>
        </div>
      )}

      {!address && (
        <p
          role="alert"
          className="flex items-center justify-between gap-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {isAddressLoading
            ? "Loading your address..."
            : "No delivery address selected."}
          {!isAddressLoading && (
            <button
              type="button"
              onClick={onChangeAddress}
              className="shrink-0 font-medium underline"
            >
              Choose address
            </button>
          )}
        </p>
      )}

      <div role="radiogroup" aria-label="Payment method" className="space-y-3">
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
                "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                selected
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-primary/15 hover:bg-primary/5",
              )}
            >
              <Icon className="size-5 shrink-0 text-primary" />
              <span>
                <span className="block font-medium">{label}</span>
                <span className="block text-sm text-muted-foreground">
                  {description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <Button
        className="h-12 w-full text-base"
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
