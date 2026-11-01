import { cn } from "@/lib/utils";
import { formatPercent } from "@/utils/index";
import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  label: string;
  value: string;
  change?: number | null;
  changeLabel?: string;
}

function StatCard({ label, value, change, changeLabel }: Props) {
  return (
    <div className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {change != null && (
        <p
          className={cn(
            "mt-1.5 flex items-center gap-1 text-xs font-medium",
            change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
          )}
        >
          {change >= 0 ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          {formatPercent(change)} {changeLabel}
        </p>
      )}
    </div>
  );
}

export default StatCard;
