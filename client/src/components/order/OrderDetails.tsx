import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ImageOff, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/api/apiClient";
import { useCancelOrder } from "@/hooks/order/useCancelOrder";
import { useOrder } from "@/hooks/order/useOrder";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import OrderTimeline from "@/components/order/OrderTimeline";
import OrderSummary from "@/components/order/OrderSummary";
import { formatPrice, type OrderTotals } from "@/utils/index";

const cardClass =
  "rounded-xl border border-primary/15 bg-primary/10 p-5 sm:p-6";

function DetailsSkeleton() {
  return (
    <div
      className="mx-auto max-w-6xl animate-pulse space-y-6 px-4 py-6 sm:px-6 sm:py-10"
      aria-hidden
    >
      <div className="h-8 w-80 max-w-full rounded bg-primary/15" />
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="h-56 rounded-xl bg-primary/15" />
          <div className="h-48 rounded-xl bg-primary/15" />
        </div>
        <div className="h-72 rounded-xl bg-primary/15" />
      </div>
    </div>
  );
}

function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useOrder(id ?? "");
  const cancelOrder = useCancelOrder();
  const order = data?.order;

  if (isLoading) return <DetailsSkeleton />;

  if (isError || !order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="text-muted-foreground">This order doesn't exist.</p>
        <Button>
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
    if (!window.confirm("Cancel this order? This can't be undone.")) return;
    cancelOrder.mutate(order._id, {
      onSuccess: (res) => toast.success(res?.message || "Order cancelled"),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to My Orders
      </Link>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="break-all text-2xl font-bold sm:text-3xl">
            Order #{order._id}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className={cardClass}>
            <h2 className="text-lg font-semibold">Items</h2>
            <ul className="mt-4 divide-y divide-primary/15">
              {order.orderItems.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-16 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="grid size-16 shrink-0 place-items-center rounded-lg bg-primary/15 text-muted-foreground">
                      <ImageOff className="size-6" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${item.productId}`}
                      className="line-clamp-2 font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className={cardClass}>
            <h2 className="mb-4 text-lg font-semibold">Order Status</h2>
            <OrderTimeline status={order.orderStatus} />
          </section>
        </div>

        <aside className="space-y-6">
          <OrderSummary totals={totals}>
            <p className="border-t border-primary/15 pt-3 text-sm text-muted-foreground">
              {paymentText}
            </p>
          </OrderSummary>

          <section className={cardClass}>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="size-4 text-primary" />
              Shipping Address
            </h2>
            {address ? (
              <address className="mt-3 space-y-0.5 text-sm not-italic">
                <p className="font-medium">{address.fullname}</p>
                <p className="text-muted-foreground">{address.phone}</p>
                <p>{address.address}</p>
                <p className="text-muted-foreground">
                  {address.city}, {address.state} {address.pincode}
                </p>
                <p className="text-muted-foreground">{address.country}</p>
              </address>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Address no longer available.
              </p>
            )}
          </section>

          {order.orderStatus === "Processing" && (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="h-11 w-full border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
                disabled={cancelOrder.isPending}
                onClick={handleCancel}
              >
                {cancelOrder.isPending ? "Cancelling..." : "Cancel Order"}
              </Button>
              {order.paidAt && (
                <p className="text-xs text-muted-foreground">
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
