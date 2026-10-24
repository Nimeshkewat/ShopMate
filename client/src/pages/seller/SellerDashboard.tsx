import { useSellerDashboard } from "@/hooks/seller/useSellerDashboard";
import { isApprovalError } from "@/components/seller/isApprovalError";
import ApprovalPending from "@/components/seller/ApprovalPending";
import StatCard from "@/components/seller/dashboard/StatCard";
import { formatCompact } from "@/utils";
import MonthlySalesChart from "@/components/seller/dashboard/MonthlySalesChart";
import OrderStatusChart from "@/components/seller/dashboard/OrderStatusChart";
import TopSellingChart from "@/components/seller/dashboard/TopSellingChart";
import TopProductsTable from "@/components/seller/dashboard/TopProductsTable";
import DashboardSummary from "@/components/seller/dashboard/DashboardSummary";

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden>
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-72 rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="h-72 rounded-2xl bg-muted lg:col-span-2" />
        <div className="h-72 rounded-2xl bg-muted" />
      </div>
    </div>
  );
}

function SellerDashboard() {
  const { data, isLoading, isError, error, refetch } = useSellerDashboard();

  if (isApprovalError(error)) return <ApprovalPending />;

  const stats = data?.stats;

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Check the sales and value.
        </p>
      </header>

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError || !stats ? (
        <p
          role="alert"
          className="flex items-center justify-center gap-3 py-16 text-destructive"
        >
          Couldn't load your dashboard.
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
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Today's Revenue"
              value={formatCompact(stats.todayRevenue)}
              change={stats.revenueChangePct}
              changeLabel="from yesterday"
            />
            <StatCard
              label="Total Customers"
              value={String(stats.totalCustomers)}
            />
            <StatCard
              label="All Time Revenue"
              value={formatCompact(stats.allTimeRevenue)}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <MonthlySalesChart data={stats.monthlySales} />
            <OrderStatusChart data={stats.orderStatus} />
            <TopSellingChart products={stats.topProducts} />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <TopProductsTable products={stats.topProducts} />
            <DashboardSummary stats={stats} />
          </div>
        </>
      )}
    </div>
  );
}
export default SellerDashboard;
