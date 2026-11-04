import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getErrorMessage } from "@/api/apiClient";
import { useCancelOrder } from "@/hooks/order/useCancelOrder";
import { useOrder } from "@/hooks/order/useOrder";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import OrderTimeline from "@/components/order/OrderTimeline";
import OrderSummary from "@/components/order/OrderSummary";
import { formatPrice, type OrderTotals } from "@/utils/index";

const cardClass =
  "rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60 sm:p-6";

function DetailsSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-6 sm:px-6 sm:py-10"
      aria-hidden
    >
      <div className="h-8 w-80 max-w-full rounded bg-muted" />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="h-56 rounded-xl bg-muted" />
          <div className="h-48 rounded-xl bg-muted" />
        </div>
        <div className="h-72 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOrder(id ?? "");
  const cancelOrder = useCancelOrder();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const order = data?.order;

  if (isLoading) return <DetailsSkeleton />;

  if (isError || !order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-xl font-bold">Order not found</h1>
        <p className="text-sm text-muted-foreground">This order doesn't exist.</p>
        <Button size="sm" >
          <Link to="/orders">Back to My Orders</Link>
        </Button>
      </div>
    );
  }

  const address =
    order.shippingInfoId && typeof order.shippingInfoId === "object"
      ? order.shippingInfoId
      : null;

  const totals: OrderTotals = {
    itemCount: order.orderItems.reduce((n, i) => n + i.quantity, 0),
    subtotal: order.price,
    shipping: order.shippingPrice,
    tax: order.tax,
    total: order.totalPrice,
  };

  const paymentText = order.paidAt
    ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}`
    : order.orderStatus === "Cancelled"
      ? "Not paid"
      : "Payment pending";

  const handleCancel = () => {
    cancelOrder.mutate(order._id, {
      onSuccess: (res) => toast.success(res?.message || "Order cancelled"),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to My Orders
      </Link>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-all text-xl font-bold tracking-tight sm:text-2xl">
            Order #{order._id}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className={cardClass}>
            <h2 className="text-base font-semibold text-foreground">Items</h2>
            <ul className="mt-4 divide-y divide-border/40">
              {order.orderItems.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-14 shrink-0 rounded-lg bg-secondary/50 object-contain p-1 ring-1 ring-border/40"
                    />
                  ) : (
                    <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground ring-1 ring-border/40">
                      <ImageOff className="size-5" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.productId}`}
                      className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className={cardClass}>
            <h2 className="mb-4 text-base font-semibold text-foreground">Order Status</h2>
            <OrderTimeline status={order.orderStatus} />
          </section>
        </div>

        <aside className="space-y-6">
          <OrderSummary totals={totals}>
            <p className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
              {paymentText}
            </p>
          </OrderSummary>

          <section className={cardClass}>
            <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <MapPin className="size-4 text-primary" />
              Shipping Address
            </h2>
            {address ? (
              <address className="mt-3 space-y-0.5 text-xs not-italic">
                <p className="font-semibold text-foreground">{address.fullname}</p>
                <p className="text-muted-foreground">{address.phone}</p>
                <p className="text-foreground">{address.address}</p>
                <p className="text-muted-foreground">
                  {address.city}, {address.state} {address.pincode}
                </p>
                <p className="text-muted-foreground">{address.country}</p>
              </address>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">
                Address no longer available.
              </p>
            )}
          </section>

          {order.orderStatus === "Processing" && (
            <div className="space-y-2">
              <AlertDialog
                open={cancelDialogOpen}
                onOpenChange={setCancelDialogOpen}
              >
                <AlertDialogTrigger
                  render={
                    <Button
                      variant="outline"
                      className="h-10 w-full border-destructive/30 bg-destructive/5 text-xs font-semibold text-destructive hover:bg-destructive/15 hover:border-destructive/50"
                      disabled={cancelOrder.isPending}
                    />
                  }
                >
                  {cancelOrder.isPending ? "Cancelling..." : "Cancel Order"}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setCancelDialogOpen(false)}
                      disabled={cancelOrder.isPending}
                    >
                      Keep Order
                    </Button>
                    <Button
                      variant="destructive"
                      disabled={cancelOrder.isPending}
                      onClick={() => {
                        setCancelDialogOpen(false);
                        handleCancel();
                      }}
                    >
                      Cancel Order
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {order.paidAt && (
                <p className="text-[11px] text-muted-foreground">
                  Refunds for online payments are handled by our team after
                  cancellation.
                </p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default OrderDetails;
