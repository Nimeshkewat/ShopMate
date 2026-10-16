import { Sparkles, X } from "lucide-react";
import { useAISearch } from "@/hooks/product/useAISearch";
import ProductGrid from "./ProductGrid";

interface Props {
  query: string;
  onClear: () => void;
}

function AIResults({ query, onClear }: Props) {
  const { data, isLoading, isError } = useAISearch(query);

  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-2 text-sm">
        <span className="flex min-w-0 items-center gap-2">
          <Sparkles className="size-4 shrink-0 text-fuchsia-500" />
          <span className="truncate">AI results for "{query}"</span>
        </span>
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear AI search"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
      <ProductGrid
        products={data?.products}
        isLoading={isLoading}
        isError={isError}
        onReset={onClear}
      />
    </>
  );
}

export default AIResults;
