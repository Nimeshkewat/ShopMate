import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/global/useDebounce";
import { useProducts } from "@/hooks/product/useProducts";
import { CURRENCY } from "@/utils/constants";

interface ResultsProps {
  term: string;
  onSelect: () => void;
}

// rendered only while there is a search term, so the query never runs for an empty box
function SearchResults({ term, onSelect }: ResultsProps) {
  const { data, isLoading } = useProducts({ search: term, limit: 5 });
  const { data: topData } = useProducts({ limit: 3 });
  const results = data?.products ?? [];
  const topProducts = topData?.products ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
        <Spinner size="sm" className="text-primary" />
        <span>Searching catalog...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="space-y-4">
        <p className="py-2 text-center text-sm text-muted-foreground">
          No products found for "{term}".
        </p>
        {topProducts.length > 0 && (
          <div className="mt-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Top picks for you
            </p>
            <ul className="space-y-2">
              {topProducts.map((product) => (
                <li key={product._id}>
                  <Link
                    to={`/product/${product._id}`}
                    onClick={onSelect}
                    className="flex items-center gap-3 rounded-xl bg-secondary/50 p-2.5 ring-1 ring-border/50 transition-colors hover:bg-secondary hover:ring-primary/30"
                  >
                    {product.images[0]?.url && (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="size-11 rounded-lg object-contain bg-background p-1"
                      />
                    )}
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                      {product.name}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {CURRENCY}
                      {product.price.toFixed(2)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <ul className="max-h-[55vh] space-y-2 overflow-y-auto">
      {results.map((product) => (
        <li key={product._id}>
          <Link
            to={`/product/${product._id}`}
            onClick={onSelect}
            className="flex items-center gap-3 rounded-xl bg-secondary/50 p-2.5 ring-1 ring-border/50 transition-colors hover:bg-secondary hover:ring-primary/30"
          >
            {product.images[0]?.url && (
              <img
                src={product.images[0].url}
                alt=""
                className="size-11 rounded-lg object-contain bg-background p-1"
              />
            )}
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
              {product.name}
            </span>
            <span className="text-sm font-semibold text-primary">
              {CURRENCY}
              {product.price.toFixed(2)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const trimmed = query.trim();
  const debounced = useDebounce(trimmed, 300);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) setQuery("");
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="top-6 translate-y-0 gap-4 border-border/60 bg-card p-5 shadow-xl sm:max-w-2xl sm:p-6 [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-lg [&>button]:bg-secondary [&>button]:p-1.5 [&>button]:text-muted-foreground">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">Search Products</DialogTitle>
          <DialogDescription className="sr-only">
            Type to search the product catalog
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="h-11 bg-background pl-9 text-sm ring-1 ring-border/60 focus-visible:ring-primary"
            autoFocus
          />
        </form>

        {!trimmed ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Start typing to search for products.
          </p>
        ) : !debounced ? (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <Spinner size="xs" className="text-primary" />
            <span>Searching...</span>
          </div>
        ) : (
          <SearchResults
            term={debounced}
            onSelect={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
