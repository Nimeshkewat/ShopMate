import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  MAX_PRICE,
  stockBadge,
  type ProductFilterValues,
  type StockStatus,
} from "../../utils/index";
import RatingStars from "../review/RatingStars";

const ratingOptions = [4, 3, 2, 1];
const availabilityOptions: StockStatus[] = ["in", "limited", "out"];

const optionClass = (active: boolean) =>
  cn(
    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/15",
    active && "bg-primary/20 font-medium text-primary hover:bg-primary/20",
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
    <div className="space-y-6 rounded-xl border border-primary/15 bg-primary/10 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActive && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <section>
        <h3 className="mb-4 font-semibold">Price Range</h3>
        <Slider
          value={[filters.maxPrice]}
          min={0}
          max={MAX_PRICE}
          step={50}
          onValueChange={(value) => {
            const newValue = Array.isArray(value) ? value[0] : value;
            set({ maxPrice: newValue });
          }}
          aria-label="Maximum price"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span>${filters.maxPrice}</span>
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold">Rating</h3>
        <ul className="space-y-1">
          {ratingOptions.map((n) => (
            <li key={n}>
              <button
                type="button"
                aria-pressed={filters.minRating === n}
                onClick={() =>
                  set({ minRating: filters.minRating === n ? null : n })
                }
                className={cn(
                  optionClass(filters.minRating === n),
                  "flex items-center gap-2",
                )}
              >
                <RatingStars rating={n} />
                <span className="text-xs text-muted-foreground">& up</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="mb-2 font-semibold">Availability</h3>
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
        <h3 className="mb-2 font-semibold">Category</h3>
        <ul className="space-y-1">
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
