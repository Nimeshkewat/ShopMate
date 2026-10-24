import {
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Trophy,
  UserPlus,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/index";
import type { SellerDashboardStats } from "@/api/seller/sellerDashboardApi";
import SellerDashboardCard from "./sellerDashboardCard";

function DashboardSummary({ stats }: { stats: SellerDashboardStats }) {
  const { summary, topProducts } = stats;
  const best = topProducts[0];
  const growth = summary.revenueGrowthPct;

  const items = [
    {
      icon: Wallet,
      title: "Total Sales this Month",
      text: `This month's sales: ${formatPrice(summary.salesThisMonth)}`,
    },
    {
      icon: ShoppingBag,
      title: "Total Orders Placed",
      text: `Orders this month: ${summary.ordersThisMonth}`,
    },
    {
      icon: Trophy,
      title: "Top Selling Product",
      text: best
        ? `Best Seller: ${best.name} (${best.totalSold} sold)`
        : "No sales yet",
    },
    {
      icon: TriangleAlert,
      title: "Low Stock Alerts",
      text: `${summary.lowStockCount} ${summary.lowStockCount === 1 ? "product" : "products"} running low on stock`,
      iconClass: summary.lowStockCount > 0 ? "text-red-500" : undefined,
    },
    {
      icon: growth != null && growth < 0 ? TrendingDown : TrendingUp,
      title: "Revenue Growth Rate",
      text:
        growth == null
          ? "Not enough data yet"
          : `Revenue ${growth >= 0 ? "up" : "down"} by ${Math.abs(growth).toFixed(1)}% compared to last month`,
      iconClass:
        growth != null && growth < 0 ? "text-red-500" : "text-emerald-500",
    },
    {
      icon: UserPlus,
      title: "New Customers This Month",
      text: `New customers joined: ${summary.newCustomersThisMonth}`,
    },
  ];

  return (
    <SellerDashboardCard
      title="Summary"
      description="Summary of key metrics for the current month"
    >
      <ul className="space-y-4">
        {items.map(({ icon: Icon, title, text, iconClass }) => (
          <li key={title} className="flex items-start gap-3">
            <Icon
              className={cn("mt-0.5 size-5 shrink-0 text-primary", iconClass)}
            />
            <div className="min-w-0">
              <p className="text-sm font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </SellerDashboardCard>
  );
}

export default DashboardSummary;
