import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDER_FILTERS, type OrderFilter } from "@/utils/constants";

interface Props {
  value: OrderFilter;
  onChange: (value: OrderFilter) => void;
}

function OrderStatusFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-card p-4 shadow-sm ring-1 ring-border/60">
      <span className="mr-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Filter className="size-3.5 text-primary" />
        Filter:
      </span>
      {ORDER_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={value === filter}
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
            value === filter
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default OrderStatusFilter;
