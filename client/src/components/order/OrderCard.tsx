import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types/order";
import { formatPrice } from "@/utils/index";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: Order;
  onTrack: (order: Order) => void;
  onCancel: (order: Order) => void;
  isCancelling?: boolean;
}
const actionButton = "border-primary/20 bg-primary/15 hover:bg-primary/25";

function OrderCard({ order, onTrack, onCancel, isCancelling }: Props) {
  return (
    <article className="rounded-xl border border-primary/15 bg-primary/10 p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="break-all font-semibold sm:text-lg">
            Order #{order._id}
          </h2>
          <p className="text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4 sm:gap-5">
          <OrderStatusBadge status={order.orderStatus} />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(order.totalPrice)}
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2 rounded-lg bg-background/40 p-3">
        {order.orderItems.map((item) => (
          <li key={item.productId} className="flex items-center gap-3">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="size-12 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary/15 text-muted-foreground">
                <ImageOff className="size-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-muted-foreground">
                  {formatPrice(item.price)} each
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-primary/15 pt-4">
        <Button variant="outline" size="sm" className={actionButton}>
          <Link to={`/orders/${order._id}`}>View Details</Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={actionButton}
          onClick={() => onTrack(order)}
        >
          Track Order
        </Button>
        {order.orderStatus === "Processing" && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 hover:text-destructive"
            disabled={isCancelling}
            onClick={() => onCancel(order)}
          >
            {isCancelling ? "Cancelling..." : "Cancel Order"}
          </Button>
        )}
      </div>
    </article>
  );
}

export default OrderCard;
