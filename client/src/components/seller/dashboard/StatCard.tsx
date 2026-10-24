import { cn } from "@/lib/utils";
import { formatPercent } from "@/utils/index";

interface Props {
  label: string;
  value: string;
  change?: number | null;
  changeLabel?: string;
}

function StatCard({ label, value, change, changeLabel }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
      {change != null && (
        <p
          className={cn(
            "mt-1 text-xs",
            change >= 0 ? "text-emerald-500" : "text-red-500",
          )}
        >
          {formatPercent(change)} {changeLabel}
        </p>
      )}
    </div>
  );
}

export default StatCard;
