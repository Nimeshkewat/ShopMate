import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminDashboard } from "@/hooks/admin/dashboard/useAdminDashboard";
import OrderStatusChart from "@/components/seller/dashboard/OrderStatusChart";
import StatCard from "@/components/seller/dashboard/StatCard";
import { formatCompact } from "@/utils/index";
import RecentOrdersCard from "@/components/admin/dashboard/RecentOrdersCard";
import { AlertTriangle } from "lucide-react";

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-24 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="h-72 rounded-xl bg-muted" />
        <div className="h-72 rounded-xl bg-muted lg:col-span-2" />
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { data, isLoading, isError, refetch } = useAdminDashboard();
  const stats = data?.stats;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          An overview of your marketplace.
        </p>
      </header>

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError || !data || !stats ? (
        <p
          role="alert"
          className="flex items-center justify-center gap-3 py-16 text-destructive"
        >
          Couldn't load the dashboard.
          <button
            type="button"
            onClick={() => refetch()}
            className="font-medium underline"
          >
            Retry
          </button>
        </p>
      ) : (
        <>
          {stats.pendingSellers > 0 && (
            <div className="flex flex-col gap-3 rounded-xl border border-amber-500/25 bg-amber-500/8 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-sm font-medium">
                  {stats.pendingSellers} seller{" "}
                  {stats.pendingSellers === 1
                    ? "application is"
                    : "applications are"}{" "}
                  waiting for review.
                </p>
              </div>
              <Button size="sm" className="shrink-0">
                <Link to="/admin/sellers">Review now</Link>
              </Button>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Total Revenue"
              value={formatCompact(stats.revenue)}
            />
            <StatCard label="Total Orders" value={String(stats.totalOrders)} />
            <StatCard label="Total Users" value={String(stats.users)} />
            <StatCard label="Sellers" value={String(stats.sellers)} />
            <StatCard label="Products" value={String(stats.products)} />
            <Link
              to="/admin/sellers"
              className="block rounded-xl focus-visible:outline-2 focus-visible:outline-ring"
            >
              <StatCard
                label="Pending Applications"
                value={String(stats.pendingSellers)}
              />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <OrderStatusChart data={stats.orderStatus} />
            <RecentOrdersCard orders={data.recentOrders} />
          </div>
        </>
      )}
    </div>
  );
}
export default AdminDashboard;
