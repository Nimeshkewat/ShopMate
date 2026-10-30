import { Link } from "react-router-dom";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { formatPrice } from "@/utils/index";
import type { RecentOrder } from "@/types/admin";

function RecentOrdersCard({ orders }: { orders: RecentOrder[] }) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Recent Orders</h2>
          <p className="text-sm text-muted-foreground">
            The latest orders placed on the store
          </p>
        </div>
        <Link
          to="/admin/orders"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No orders yet.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-120 text-sm">
            <thead className="bg-primary/10 text-left">
              <tr>
                {["Order", "Customer", "Total", "Status", "Date"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-3 font-semibold first:rounded-l-lg last:rounded-r-lg"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-3 font-mono text-xs" title={order._id}>
                    #{order._id.slice(-8)}
                  </td>
                  <td className="px-4 py-3">
                    {order.userId.username ?? (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.orderStatus} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default RecentOrdersCard;
