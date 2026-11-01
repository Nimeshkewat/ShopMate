import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { OrderStatus } from "@/types/order";
import ChartTooltip from "./ChartToolTip";
import SellerDashboardCard, { EmptyChart } from "./SellerDashboardCard";

// Calibrated OKLCH-equivalent hex values — match token system
const COLORS: Record<OrderStatus, string> = {
  Processing: "#d97706", // amber-600
  Shipped:    "#4f46e5", // indigo-600 (brand)
  Delivered:  "#059669", // emerald-600
  Cancelled:  "#dc2626", // red-600
};

function OrderStatusChart({
  data,
}: {
  data: { status: OrderStatus; count: number }[];
}) {
  const isEmpty = data && data.every((d) => d.count === 0);

  return (
    <SellerDashboardCard title="Order Status" description="Breakdown by current status">
      {isEmpty ? (
        <EmptyChart />
      ) : (
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                innerRadius={52}
                outerRadius={82}
                paddingAngle={3}
                strokeWidth={0}
              >
                {data &&
                  data.map((entry) => (
                    <Cell key={entry.status} fill={COLORS[entry.status]} />
                  ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </SellerDashboardCard>
  );
}

export default OrderStatusChart;
