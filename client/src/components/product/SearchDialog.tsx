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

interface ResultsProps {
  term: string;
  onSelect: () => void;
}

// rendered only while there is a search term, so the query never runs for an empty box
function SearchResults({ term, onSelect }: ResultsProps) {
  const { data, isLoading } = useProducts({ search: term, limit: 5 });
  const results = data?.products ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
        <Spinner size="sm" className="text-primary" />
        <span>Searching catalog...</span>
      </div>
    );
  }
  if (results.length === 0) {
    return (
      <p className="py-2 text-center text-sm text-muted-foreground">
        No products found for "{term}".
      </p>
    );
  }

  return (
    <ul className="max-h-[55vh] space-y-2 overflow-y-auto">
      {results.map((product) => (
        <li key={product._id}>
          <Link
            to={`/product/${product._id}`}
            onClick={onSelect}
            className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/10 p-2 transition-colors hover:bg-primary/20"
          >
            {product.images[0]?.url && (
              <img
                src={product.images[0].url}
                alt=""
                className="size-12 rounded-lg object-cover"
              />
            )}
            <span className="min-w-0 flex-1 truncate font-medium">
              {product.name}
            </span>
            <span className="font-semibold text-primary">
              ${product.price.toFixed(2)}
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
      <DialogContent className="top-6 translate-y-0 gap-4 border-white/20 bg-background/40 p-5 backdrop-blur-xl sm:max-w-2xl sm:p-6 [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-lg [&>button]:bg-primary/15 [&>button]:p-1.5 [&>button]:text-primary">
        <DialogHeader>
          <DialogTitle className="text-xl">Search Products</DialogTitle>
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
            className="h-12 bg-background/50 pl-10"
            autoFocus
          />
        </form>

        {!trimmed ? (
          <p className="py-2 text-center text-sm text-muted-foreground">
            Start typing to search for products.
          </p>
        ) : !debounced ? (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
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
