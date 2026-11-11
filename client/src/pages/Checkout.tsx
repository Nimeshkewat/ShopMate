import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/hooks/cart/useCartActions";
import { usePlaceOrder } from "@/hooks/order/usePlaceOrder";
import { useShippingInfos } from "@/hooks/shipping/useShippingInfos";
import type { PaymentType } from "@/types/order";
import CheckoutStepper from "../components/order/CheckoutStepper";
import OrderSummary from "../components/order/OrderSummary";
import PaymentStep from "../components/order/PaymentStep";
import ShippingStep from "../components/order/ShippingStep";
import { calculateTotals } from "../utils/index";

function Checkout() {
  const navigate = useNavigate();
  const { items, isLoading: cartLoading } = useCartActions();
  const {
    data,
    isLoading: addressesLoading,
    isError: addressesError,
    refetch: refetchAddresses,
  } = useShippingInfos();
  const { placeOrder, isPlacing } = usePlaceOrder();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<PaymentType>("Online");

  const addresses = data?.shippingInfos ?? [];
  const selectedInList = Boolean(
    selectedId && addresses.some((a) => a._id === selectedId),
  );
  const activeId = selectedInList
    ? selectedId
    : (addresses[0]?._id ?? selectedId ?? null);
  const selectedAddress = addresses.find((a) => a._id === activeId);
  const totals = calculateTotals(items);

  if (cartLoading) {
    return (
      <p className="mx-auto max-w-4xl px-4 py-10 text-xs text-muted-foreground sm:px-6">
        Loading checkout...
      </p>
    );
  }
  if (items.length === 0 && !isPlacing) return <Navigate to="/cart" replace />;

  const goBack = () => (step === 2 ? setStep(1) : navigate("/cart"));

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl overflow-x-clip px-4 py-6 sm:px-6 sm:py-10">
      <Button
        variant="outline"
        size="icon"
        className="size-8 rounded-lg border-border/60 text-foreground hover:bg-secondary"
        onClick={goBack}
        aria-label="Go back"
      >
        <ArrowLeft className="size-4" />
      </Button>

      <div
        role="note"
        className="mt-5 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm"
      >
        <Info
          className="mt-0.5 size-4 shrink-0 text-primary"
          aria-hidden="true"
        />
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">Portfolio demo:</span>{" "}
          Online payments use Razorpay test mode. No real payment will be
          charged, and orders are not fulfilled. Please don't enter real payment
          details.
        </p>
      </div>

      <div className="mt-6">
        <CheckoutStepper step={step} />
      </div>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {step === 1 ? (
            <ShippingStep
              addresses={addresses}
              isLoading={addressesLoading}
              isError={addressesError}
              onRetry={() => void refetchAddresses()}
              selectedId={activeId}
              onSelect={setSelectedId}
              onContinue={() => setStep(2)}
            />
          ) : (
            <PaymentStep
              address={selectedAddress}
              total={totals.total}
              paymentType={paymentType}
              onPaymentTypeChange={setPaymentType}
              onChangeAddress={() => setStep(1)}
              onPlaceOrder={() => {
                if (activeId) void placeOrder(activeId, paymentType);
              }}
              isPlacing={isPlacing}
              isAddressLoading={addressesLoading}
            />
          )}
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <OrderSummary totals={totals} items={items} />
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
