import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <Button
        variant="outline"
        size="icon"
        className="size-8 rounded-lg border-border/60 text-foreground hover:bg-secondary"
        onClick={goBack}
        aria-label="Go back"
      >
        <ArrowLeft className="size-4" />
      </Button>

      <div className="mt-6">
        <CheckoutStepper step={step} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
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

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary totals={totals} items={items} />
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
