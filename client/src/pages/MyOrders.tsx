import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/api/apiClient";
import { useCancelOrder } from "@/hooks/order/useCancelOrder";
import { useMyOrders } from "@/hooks/order/useMyOrder";
import type { Order } from "@/types/order";
import OrderCard from "@/components/order/OrderCard";
import OrderCardSkeleton from "@/components/order/OrderCardSkeleton";
import OrderStatusFilter from "@/components/order/OrderStatusFilter";
import OrderTrackingDialog from "@/components/order/OrderTrackingDialog";
import type { OrderFilter } from "@/utils/constants";

function MyOrders() {
  const { data, isLoading, isError, refetch } = useMyOrders();
  const cancelOrder = useCancelOrder();
  const [filter, setFilter] = useState<OrderFilter>("All");
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const orders = data?.orders ?? [];
  const visible =
    filter === "All" ? orders : orders.filter((o) => o.orderStatus === filter);
  const trackingOrder = orders.find((o) => o._id === trackingId) ?? null;

  const handleCancel = (order: Order) => {
    if (!window.confirm("Cancel this order? This can't be undone.")) return;
    cancelOrder.mutate(order._id, {
      onSuccess: (res) => toast.success(res?.message || "Order cancelled"),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="text-3xl font-bold">My Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Track and manage your order history.
      </p>

      <div className="mt-6">
        <OrderStatusFilter value={filter} onChange={setFilter} />
      </div>

      <div className="mt-6 space-y-5">
        {isLoading ? (
          Array.from({ length: 2 }, (_, i) => <OrderCardSkeleton key={i} />)
        ) : isError ? (
          <p
            role="alert"
            className="flex items-center justify-center gap-3 py-10 text-destructive"
          >
            Couldn't load your orders.
            <button
              type="button"
              onClick={() => refetch()}
              className="font-medium underline"
            >
              Retry
            </button>
          </p>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="font-medium">
              {orders.length === 0
                ? "You haven't placed any orders yet."
                : `No ${filter.toLowerCase()} orders.`}
            </p>
            {orders.length === 0 ? (
              <Button>
                <Link to="/products">Start shopping</Link>
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setFilter("All")}>
                Show all orders
              </Button>
            )}
          </div>
        ) : (
          visible.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onTrack={(o) => setTrackingId(o._id)}
              onCancel={handleCancel}
              isCancelling={
                cancelOrder.isPending && cancelOrder.variables === order._id
              }
            />
          ))
        )}
      </div>

      <OrderTrackingDialog
        order={trackingOrder}
        onOpenChange={(open) => !open && setTrackingId(null)}
      />
    </div>
  );
}

export default MyOrders;
