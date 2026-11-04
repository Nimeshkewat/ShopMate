import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CATEGORIES } from "@/utils/constants";
import AIResults from "../components/product/AiResults";
import AISearchDialog from "../components/product/AiSearchDialog";
import CatalogResults from "../components/product/CatalogResults";
import ProductFilters from "../components/product/ProductFilters";
import { MAX_PRICE, defaultFilters } from "../utils";

const categoryNames = CATEGORIES.map((c) => c.name);

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category");

  const [filters, setFilters] = useState(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  const setParam = (key: string, value: string | null) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );

  const reset = () => {
    setFilters(defaultFilters);
    setAiQuery("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const filtersPanel = (
    <ProductFilters
      filters={filters}
      onFiltersChange={setFilters}
      category={category}
      onCategoryChange={(c) => setParam("category", c)}
      categories={categoryNames}
      onReset={reset}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">{filtersPanel}</aside>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="size-10 shrink-0 border-border/60 lg:hidden"
              onClick={() => setFiltersOpen(true)}
              aria-label="Open filters"
            >
              <SlidersHorizontal className="size-4" />
            </Button>

            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setParam("search", e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-10 bg-card pl-9 text-sm ring-1 ring-border/60 focus-visible:ring-primary"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setAiOpen(true)}
              className="h-10 shrink-0 border-primary/30 bg-primary/8 text-primary hover:bg-primary/15"
            >
              <Sparkles className="size-4" />
              <span className="hidden sm:inline">AI Search</span>
            </Button>
          </div>

          {aiQuery ? (
            <AIResults query={aiQuery} onClear={() => setAiQuery("")} />
          ) : (
            <CatalogResults
              params={{
                search: search || undefined,
                category: category ?? undefined,
                maxPrice:
                  filters.maxPrice === MAX_PRICE ? undefined : filters.maxPrice,
                minRating: filters.minRating ?? undefined,
                availability: filters.availability ?? undefined,
              }}
              onReset={reset}
            />
          )}
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent
          side="left"
          className="w-80 gap-0 overflow-y-auto border-r border-border/60 bg-card p-4 shadow-xl sm:max-w-xs [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-lg [&>button]:bg-secondary [&>button]:p-1.5 [&>button]:text-muted-foreground"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Filter the product list</SheetDescription>
          </SheetHeader>
          <div className="pt-8">{filtersPanel}</div>
        </SheetContent>
      </Sheet>

      <AISearchDialog
        open={aiOpen}
        onOpenChange={setAiOpen}
        onSearch={setAiQuery}
      />
    </div>
  );
}

export default Products;
