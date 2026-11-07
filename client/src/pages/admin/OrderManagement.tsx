import { useState } from "react";
import AppPagination from "@/components/common/AppPagination";
import { useAdminOrders } from "@/hooks/admin/order-management/useAdminOrders";
import AdminOrdersTable from "@/components/admin/order/AdminOrdersTable";
import AdminOrderSheet from "@/components/admin/order/AdminOrderSheet";

const LIMIT = 10;
function OrderManagement() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useAdminOrders({
    page,
    limit: LIMIT,
  });
  const [viewId, setViewId] = useState<string | null>(null);

  const orders = data?.orders ?? [];
  const total = data?.pagination.total ?? 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Order Oversight</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor every order and fix payment issues.
          </p>
        </div>
        {!isLoading && total > 0 && (
          <span className="rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary">
            {total} {total === 1 ? "order" : "orders"}
          </span>
        )}
      </header>

      {isLoading ? (
        <div
          className="animate-pulse space-y-2.5 rounded-xl bg-card p-4 ring-1 ring-border/60"
          aria-hidden
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-12 rounded-lg bg-muted" />
          ))}
        </div>
      ) : isError ? (
        <p
          role="alert"
          className="flex items-center justify-center gap-3 py-16 text-destructive"
        >
          Couldn't load orders.
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium underline"
          >
            Retry
          </button>
        </p>
      ) : orders.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No orders have been placed yet.
        </p>
      ) : (
        <>
          <AdminOrdersTable
            orders={orders}
            onView={(order) => setViewId(order._id)}
          />
          <AppPagination
            pagination={data?.pagination}
            page={page}
            onPageChange={setPage}
          />
        </>
      )}

      <AdminOrderSheet
        orderId={viewId}
        onOpenChange={(open) => !open && setViewId(null)}
      />
    </div>
  );
}

export default OrderManagement;
