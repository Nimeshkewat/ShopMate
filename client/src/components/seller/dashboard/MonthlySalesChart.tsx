import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPrice } from "@/utils/index";
import { formatCompact } from "@/utils/index";
import ChartTooltip from "./ChartToolTip";
import SellerDashboardCard, { EmptyChart } from "./SellerDashboardCard";

const tick = { fill: "currentColor", fontSize: 12 };

function MonthlySalesChart({
  data,
}: {
  data: { month: string; sales: number }[];
}) {
  return (
    <SellerDashboardCard title="Monthly Sales">
      {data.length === 0 ? (
        <EmptyChart />
      ) : (
        <div className="h-60 text-muted-foreground">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                opacity={0.2}
              />
              <XAxis
                dataKey="month"
                tick={tick}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={tick}
                tickLine={false}
                axisLine={false}
                width={52}
                tickFormatter={(v) => formatCompact(Number(v))}
              />
              <Tooltip content={<ChartTooltip formatValue={formatPrice} />} />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#0a7cff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </SellerDashboardCard>
  );
}
export default MonthlySalesChart;
