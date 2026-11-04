import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SellerDashboardStats } from "@/api/seller/sellerDashboardApi";
import ChartTooltip from "./ChartToolTip";
import SellerDashboardCard, { EmptyChart } from "./SellerDashboardCard";

// Harmonized token-aligned palette
const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
const tick = { fill: "currentColor", fontSize: 11 };

function TopSellingChart({
  products,
}: {
  products: SellerDashboardStats["topProducts"];
}) {
  const data = products.slice(0, 5);

  return (
    <SellerDashboardCard title="Top Selling Products" description="Units sold per product">
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-60 text-muted-foreground">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 0 }}
            >
              <XAxis
                type="number"
                allowDecimals={false}
                tick={tick}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={96}
                tick={tick}
                tickLine={false}
                axisLine={false}
                tickFormatter={(name: string) =>
                  name.length > 14 ? `${name.slice(0, 14)}…` : name
                }
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "currentColor", opacity: 0.05 }}
              />
              <Bar dataKey="totalSold" name="Sold" radius={[0, 4, 4, 0]}>
                {data.map((product, i) => (
                  <Cell
                    key={product.productId}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </SellerDashboardCard>
  );
}

export default TopSellingChart;
