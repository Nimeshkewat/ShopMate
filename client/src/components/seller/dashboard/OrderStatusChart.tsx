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

const COLORS: Record<OrderStatus, string> = {
  Processing: "#f59e0b",
  Shipped: "#3b82f6",
  Delivered: "#10b981",
  Cancelled: "#ef4444",
};

function OrderStatusChart({
  data,
}: {
  data: { status: OrderStatus; count: number }[];
}) {
  const isEmpty = data.every((d) => d.count === 0);

  return (
    <SellerDashboardCard title="Order Status">
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
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.status} fill={COLORS[entry.status]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </SellerDashboardCard>
  );
}

export default OrderStatusChart;
