import { Link, useLocation, useParams } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaymentType } from "@/types/order";

function OrderSuccess() {
  const { id } = useParams();
  const { state } = useLocation();
  const paymentType = (state as { paymentType?: PaymentType } | null)
    ?.paymentType;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
      <span className="grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        <CircleCheck className="size-8" />
      </span>
      <h1 className="mt-6 text-3xl font-bold">Order placed successfully</h1>
      <p className="mt-2 text-muted-foreground">
        {paymentType === "CashOnDelivery"
          ? "Pay in cash when your order arrives."
          : paymentType === "Online"
            ? "Your payment was received. We'll start packing your order."
            : "Thank you for shopping with ShopMate."}
      </p>
      {id && (
        <p className="mt-4 text-sm text-muted-foreground">
          Order ID: <span className="font-medium text-foreground">{id}</span>
        </p>
      )}
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button className="h-11">
          <Link to="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" className="h-11">
          <Link to="/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  );
}

export default OrderSuccess;
