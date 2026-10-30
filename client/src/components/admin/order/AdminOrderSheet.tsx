import { useState } from "react";
import { ImageOff } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getErrorMessage } from "@/api/apiClient";
import { useUpdateOrderPaymentStatus } from "@/hooks/admin/order-management/useUpdateOrderPaymentStatus";
import type { AdminOrder } from "@/types/admin";
import type { PaymentStatus } from "@/types/payment";
import PaymentStatusBadge, { paymentTypeLabel } from "./PaymentStatusBadge";
import ConfirmDialog from "../seller/ConfirmDialog";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { useAdminOrder } from "@/hooks/admin/order-management/useAdminOrder";
import { formatPrice } from "@/utils";

interface Props {
  orderId: string | null;
  onOpenChange: (open: boolean) => void;
}

const sectionTitle = "mb-2 text-sm font-semibold";

function PaymentSection({ order }: { order: AdminOrder }) {
  const updatePayment = useUpdateOrderPaymentStatus();
  const [selected, setSelected] = useState<PaymentStatus | null>(null);
  const [confirming, setConfirming] = useState(false);

  if (!order.paymentStatus && !order.orderStatus) {
    return (
      <p className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
        Payment details aren't included in this order response. Return the
        payment with the order to manage it here.
      </p>
    );
  }

  const current = (order.paymentStatus ?? order.orderStatus) as PaymentStatus;
  const next = selected ?? current;
  // always list the current status, even if it isn't one an admin can set
  // const options = Array.from(
  //   new Set<PaymentStatus>([current, ...PAYMENT_STATUSES]),
  // );

  const handleConfirm = () =>
    updatePayment.mutate(
      { id: order._id, orderStatus: next },
      {
        onSuccess: (res) => {
          toast.success(res?.message || "Payment status updated");
          setConfirming(false);
          setSelected(null);
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      },
    );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {order.paymentType && (
          <span className="font-medium">
            {paymentTypeLabel(order.paymentType)}
          </span>
        )}
        <PaymentStatusBadge status={current} />
        {order.paidAt && (
          <span className="text-muted-foreground">
            Paid {new Date(order.paidAt).toLocaleString()}
          </span>
        )}
      </div>

      {/* <div className="flex gap-2">
        <select
          aria-label="Payment status"
          value={next}
          onChange={(e) => setSelected(e.target.value as PaymentStatus)}
          className="h-9 flex-1 rounded-md border bg-background px-3 text-sm"
        >
          {options.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          className="h-9"
          disabled={next === current}
          onClick={() => setConfirming(true)}
        >
          Update
        </Button>
      </div> */}
      {/* {order.paymentType === "Online" && (
        <p className="text-xs text-muted-foreground">
          Online payments are confirmed automatically. Only change this to fix a
          mismatch.
        </p>
      )} */}

      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title="Change payment status?"
        description={`This changes the payment status from ${current} to ${next}. It also affects the seller's revenue figures.`}
        confirmLabel="Change status"
        isPending={updatePayment.isPending}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

function AdminOrderSheet({ orderId, onOpenChange }: Props) {
  const { data, isLoading, isError } = useAdminOrder(orderId!);
  const order = data?.order;

  return (
    <Sheet open={!!orderId} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b p-5">
          <SheetTitle>Order details</SheetTitle>
          <SheetDescription className="break-all">
            {orderId ? `#${orderId}` : ""}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-6 p-5">
          {isLoading ? (
            <div className="animate-pulse space-y-4" aria-hidden>
              <div className="h-6 w-40 rounded bg-muted" />
              <div className="h-28 rounded-lg bg-muted" />
              <div className="h-36 rounded-lg bg-muted" />
            </div>
          ) : isError || !order ? (
            <p role="alert" className="py-10 text-center text-destructive">
              Couldn't load this order.
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <OrderStatusBadge status={order.orderStatus} />
                <span className="text-sm text-muted-foreground">
                  Placed{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "—"}
                </span>
              </div>

              <section>
                <h3 className={sectionTitle}>Customer</h3>
                {order.userId.username ? (
                  <p className="text-sm">
                    <span className="font-medium">{order.userId.username}</span>
                    <span className="block text-muted-foreground">
                      {order.userId.email}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Customer details aren't included in this response.
                  </p>
                )}
              </section>

              <section>
                <h3 className={sectionTitle}>Shipping address</h3>
                {order.shippingInfoId ? (
                  <address className="space-y-0.5 text-sm not-italic">
                    <p className="font-medium">
                      {order.shippingInfoId.fullname}
                    </p>
                    <p className="text-muted-foreground">
                      {order.shippingInfoId.phone}
                    </p>
                    <p>{order.shippingInfoId.address}</p>
                    <p className="text-muted-foreground">
                      {order.shippingInfoId.city}, {order.shippingInfoId.state}{" "}
                      {order.shippingInfoId.pincode},{" "}
                      {order.shippingInfoId.country}
                    </p>
                  </address>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Address isn't available for this order.
                  </p>
                )}
              </section>

              <section>
                <h3 className={sectionTitle}>Items</h3>
                <ul className="divide-y rounded-xl border">
                  {order.orderItems.map((item) => (
                    <li
                      key={item.productId}
                      className="flex items-center gap-3 p-3"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="size-11 shrink-0 rounded-md object-cover"
                        />
                      ) : (
                        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
                          <ImageOff className="size-4" />
                        </span>
                      )}
                      <div className="min-w-0 flex-1 text-sm">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {formatPrice(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd>{formatPrice(order.totalPrice)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd>
                      {order.shippingPrice === 0
                        ? "Free"
                        : formatPrice(order.shippingPrice)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Tax</dt>
                    <dd>{formatPrice(order.tax)}</dd>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-base font-semibold">
                    <dt>Total</dt>
                    <dd>{formatPrice(order.totalPrice)}</dd>
                  </div>
                </dl>
              </section>

              <section>
                <h3 className={sectionTitle}>Payment</h3>
                <PaymentSection order={order} />
              </section>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AdminOrderSheet;
