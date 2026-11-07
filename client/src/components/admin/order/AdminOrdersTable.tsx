import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import type { AdminOrder } from "@/types/admin";
import { formatPrice } from "@/utils";
import PaymentStatusBadge, { paymentTypeLabel } from "./PaymentStatusBadge";

interface Props {
  orders: AdminOrder[];
  onView: (order: AdminOrder) => void;
}

const headings = [
  "Order",
  "Customer",
  "Items",
  "Total",
  "Status",
  "Payment",
  "Placed",
  "Actions",
];

function AdminOrdersTable({ orders, onView }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl bg-card shadow-sm ring-1 ring-border/60">
      <table className="w-full min-w-225 text-sm">
        <thead>
          <tr className="border-b border-border/60">
            {headings.map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {orders.map((order) => {
            const itemCount = order.orderItems.reduce(
              (n, i) => n + i.quantity,
              0,
            );
            return (
              <tr
                key={order._id}
                className="transition-colors hover:bg-secondary/40"
              >
                <td
                  className="px-4 py-3 font-mono text-xs text-muted-foreground"
                  title={order._id}
                >
                  #{order._id.slice(-8)}
                </td>
                <td className="px-4 py-3">
                  {order.userId?.username ? (
                    <>
                      <p className="font-medium text-foreground">
                        {order.userId.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.userId.email}
                      </p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">
                      Deleted customer
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground tabular-nums">
                  {itemCount}
                </td>
                <td className="px-4 py-3 font-semibold text-foreground tabular-nums">
                  {formatPrice(order.totalPrice)}
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.orderStatus} />
                </td>
                <td className="px-4 py-3">
                  {order.paymentStatus ? (
                    <div className="space-y-1">
                      <PaymentStatusBadge status={order.paymentStatus} />
                      {order.paymentType && (
                        <p className="text-xs text-muted-foreground">
                          {paymentTypeLabel(order.paymentType)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => onView(order)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrdersTable;
