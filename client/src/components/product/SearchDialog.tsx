import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { products } from "../../mock/storeFront";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SearchDialog({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const term = query.trim().toLowerCase();

  // TODO: replace with your debounced search hook
  const results = useMemo(
    () =>
      term
        ? products
            .filter((p) => p.name.toLowerCase().includes(term))
            .slice(0, 5)
        : [],
    [term],
  );

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) setQuery("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!term) return;
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
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

        {!term ? (
          <p className="py-2 text-center text-sm text-muted-foreground">
            Start typing to search for products.
          </p>
        ) : results.length === 0 ? (
          <p className="py-2 text-center text-sm text-muted-foreground">
            No products found for "{query.trim()}".
          </p>
        ) : (
          <ul className="max-h-[55vh] space-y-2 overflow-y-auto">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => handleOpenChange(false)}
                  className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/10 p-2 transition-colors hover:bg-primary/20"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="size-12 rounded-lg object-cover"
                  />
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
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
