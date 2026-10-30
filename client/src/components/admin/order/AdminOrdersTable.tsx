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
    <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
      <table className="w-full min-w-225 text-sm">
        <thead className="bg-primary/10 text-left">
          <tr>
            {headings.map((heading) => (
              <th key={heading} scope="col" className="px-4 py-3 font-semibold">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => {
            const itemCount = order.orderItems.reduce(
              (n, i) => n + i.quantity,
              0,
            );
            return (
              <tr key={order._id}>
                <td className="px-4 py-3 font-mono text-xs" title={order._id}>
                  #{order._id.slice(-8)}
                </td>
                <td className="px-4 py-3">
                  {order.userId.username ? (
                    <>
                      <p className="font-medium">{order.userId.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.userId.email}
                      </p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{itemCount}</td>
                <td className="px-4 py-3 font-medium">
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
                <td className="px-4 py-3 text-muted-foreground">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="outline"
                    size="sm"
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
