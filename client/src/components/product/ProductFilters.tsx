import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  MAX_PRICE,
  stockBadge,
  type ProductFilterValues,
  type StockStatus,
} from "../../utils/index";
import RatingStars from "../review/RatingStars";
import { CURRENCY } from "@/utils/constants";

const ratingOptions = [4, 3, 2, 1];
const availabilityOptions: StockStatus[] = ["in", "limited", "out"];

const optionClass = (active: boolean) =>
  cn(
    "w-full rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors",
    active
      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
  );

interface Props {
  filters: ProductFilterValues;
  onFiltersChange: (filters: ProductFilterValues) => void;
  category: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  onReset: () => void;
}

function ProductFilters({
  filters,
  onFiltersChange,
  category,
  onCategoryChange,
  categories,
  onReset,
}: Props) {
  const set = (patch: Partial<ProductFilterValues>) =>
    onFiltersChange({ ...filters, ...patch });
  const hasActive =
    filters.maxPrice !== MAX_PRICE ||
    filters.minRating !== null ||
    filters.availability !== null ||
    category !== null;

  return (
    <div className="space-y-6 rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Filters</h2>
        {hasActive && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Reset all
          </button>
        )}
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">Max Price</span>
          <span className="font-bold text-primary tabular-nums">
            {CURRENCY}
            {filters.maxPrice}
          </span>
        </div>
        <Slider
          value={[filters.maxPrice]}
          max={MAX_PRICE}
          step={50}
          onValueChange={(val) => {
            const v = Array.isArray(val) ? val[0] : val;
            set({ maxPrice: v });
          }}
        />
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Customer Rating</h3>
        <ul className="space-y-1">
          {ratingOptions.map((rating) => (
            <li key={rating}>
              <button
                type="button"
                aria-pressed={filters.minRating === rating}
                onClick={() =>
                  set({
                    minRating: filters.minRating === rating ? null : rating,
                  })
                }
                className={optionClass(filters.minRating === rating)}
              >
                <span className="flex items-center gap-1.5">
                  <RatingStars rating={rating} className="size-3" />
                  <span>{rating}★ & above</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Availability</h3>
        <ul className="space-y-1">
          {availabilityOptions.map((status) => (
            <li key={status}>
              <button
                type="button"
                aria-pressed={filters.availability === status}
                onClick={() =>
                  set({
                    availability:
                      filters.availability === status ? null : status,
                  })
                }
                className={optionClass(filters.availability === status)}
              >
                {stockBadge[status].label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Category</h3>
        <ul className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <li>
            <button
              type="button"
              aria-pressed={category === null}
              onClick={() => onCategoryChange(null)}
              className={optionClass(category === null)}
            >
              All Categories
            </button>
          </li>
          {categories.map((name) => (
            <li key={name}>
              <button
                type="button"
                aria-pressed={category === name}
                onClick={() => onCategoryChange(name)}
                className={optionClass(category === name)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ProductFilters;
