import { ImageOff } from "lucide-react";
import type { Order } from "@/types/order";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { formatPrice } from "@/utils/index";
import type { NextOrderStatus } from "@/types/seller";
import OrderStatusSelect from "./SellerOrderStatusSelect";

interface Props {
  order: Order;
  onStatusChange: (order: Order, next: NextOrderStatus) => void;
  isUpdating?: boolean;
}

function SellerOrderCard({ order, onStatusChange, isUpdating }: Props) {
  const address =
    order.shippingInfoId && typeof order.shippingInfoId === "object"
      ? order.shippingInfoId
      : null;
  const itemsTotal = order.orderItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <dl className="space-y-1 text-sm">
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold">Order ID:</dt>
            <dd className="break-all">{order._id}</dd>
          </div>
          <div className="flex flex-wrap items-center gap-x-2">
            <dt className="font-semibold">Status:</dt>
            <dd>
              <OrderStatusBadge status={order.orderStatus} />
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold">Placed At:</dt>
            <dd>{new Date(order.createdAt).toLocaleString()}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-semibold">Total Amount:</dt>
            <dd>{formatPrice(itemsTotal)}</dd>
          </div>
        </dl>

        <OrderStatusSelect
          status={order.orderStatus}
          disabled={isUpdating}
          onChange={(next) => onStatusChange(order, next)}
        />
      </div>

      <section className="mt-5">
        <h3 className="font-semibold">Shipping Info</h3>
        {address ? (
          <dl className="mt-2 space-y-1 text-sm">
            <div className="flex gap-x-2">
              <dt className="font-semibold">Name:</dt>
              <dd>{address.fullname}</dd>
            </div>
            <div className="flex gap-x-2">
              <dt className="font-semibold">Phone:</dt>
              <dd>{address.phone}</dd>
            </div>
            <div className="flex flex-wrap gap-x-2">
              <dt className="font-semibold">Address:</dt>
              <dd>
                {address.address}, {address.city}, {address.state}{" "}
                {address.pincode}, {address.country}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            The buyer's address is no longer available.
          </p>
        )}
      </section>

      <section className="mt-5">
        <h3 className="font-semibold">Ordered Items</h3>
        <ul className="mt-2 divide-y">
          {order.orderItems.map((item) => (
            <li key={item.productId} className="flex items-center gap-3 py-3">
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="size-14 shrink-0 rounded-lg object-cover"
                />
              ) : (
                <span className="grid size-14 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  <ImageOff className="size-5" />
                </span>
              )}
              <div className="min-w-0 text-sm">
                <p className="font-semibold">{item.name}</p>
                <p className="text-muted-foreground">
                  Qty: {item.quantity} | Price: {formatPrice(item.price)} |
                  Total Price: {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
export default SellerOrderCard;
