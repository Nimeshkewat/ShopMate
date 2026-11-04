import { Link } from "react-router-dom";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { formatPrice } from "@/utils/index";
import type { RecentOrder } from "@/types/admin";

function RecentOrdersCard({ orders }: { orders: RecentOrder[] }) {
  return (
    <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60 lg:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Recent Orders</h2>
          <p className="text-xs text-muted-foreground">
            The latest orders placed on the store
          </p>
        </div>
        <Link
          to="/admin/orders"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No orders yet.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-lg ring-1 ring-border/60">
          <table className="w-full min-w-120 text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-secondary/40 text-left">
                {["Order", "Customer", "Total", "Status", "Date"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {orders.map((order) => (
                <tr key={order._id} className="transition-colors hover:bg-secondary/30">
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground" title={order._id}>
                    #{order._id.slice(-8)}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    {order.userId.username ?? (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-foreground tabular-nums">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="px-4 py-2.5">
                    <OrderStatusBadge status={order.orderStatus} />
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground tabular-nums">
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
