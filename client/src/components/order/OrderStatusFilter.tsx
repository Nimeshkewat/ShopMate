import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDER_FILTERS, type OrderFilter } from "@/utils/constants";

interface Props {
  value: OrderFilter;
  onChange: (value: OrderFilter) => void;
}

function OrderStatusFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-primary/15 bg-primary/10 p-4">
      <span className="mr-1 flex items-center gap-2 text-sm font-medium">
        <Filter className="size-4 text-primary" />
        Filter by status:
      </span>
      {ORDER_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={value === filter}
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
            value === filter
              ? "border-primary bg-primary text-primary-foreground"
              : "border-primary/20 bg-primary/15 hover:bg-primary/25",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default OrderStatusFilter;
