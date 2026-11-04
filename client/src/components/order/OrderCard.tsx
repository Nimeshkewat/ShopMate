import { useState } from "react";
import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
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
import type { Order } from "@/types/order";
import { formatPrice } from "@/utils/index";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: Order;
  onTrack: (order: Order) => void;
  onCancel: (order: Order) => void;
  isCancelling?: boolean;
}

const actionButton = "h-8 text-xs font-medium border-border/60 hover:bg-secondary";

function OrderCard({ order, onTrack, onCancel, isCancelling }: Props) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  return (
    <article className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="break-all text-sm font-semibold text-foreground sm:text-base">
            Order #{order._id}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4 sm:gap-5">
          <OrderStatusBadge status={order.orderStatus} />
          <div className="md:text-right">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-primary tabular-nums">
              {formatPrice(order.totalPrice)}
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2 rounded-lg bg-secondary/40 p-3 ring-1 ring-border/40">
        {order.orderItems.map((item) => (
          <li key={item.productId} className="flex items-center gap-3">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="size-11 shrink-0 rounded-lg bg-background object-contain p-1 ring-1 ring-border/40"
              />
            ) : (
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground ring-1 ring-border/40">
                <ImageOff className="size-4" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground">{item.name}</p>
              <p className="text-[11px] text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="text-right text-xs">
              <p className="font-semibold text-foreground tabular-nums">
                {formatPrice(item.price * item.quantity)}
              </p>
              {item.quantity > 1 && (
                <p className="text-[10px] text-muted-foreground tabular-nums">
                  {formatPrice(item.price)} each
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
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
          <AlertDialog
            open={cancelDialogOpen}
            onOpenChange={setCancelDialogOpen}
          >
            <AlertDialogTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto h-8 text-xs border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive/15 hover:border-destructive/50"
                  disabled={isCancelling}
                />
              }
            >
              {isCancelling ? "Cancelling..." : "Cancel Order"}
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
                  disabled={isCancelling}
                >
                  Keep Order
                </Button>
                <Button
                  variant="destructive"
                  disabled={isCancelling}
                  onClick={() => {
                    setCancelDialogOpen(false);
                    onCancel(order);
                  }}
                >
                  Cancel Order
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </article>
  );
}

export default OrderCard;
