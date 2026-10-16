import { useState, type FormEvent } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const examples = [
  "Find the best suitable GPU with Ryzen 5600X",
  "Find all leather jackets for men",
  "Find all red t-shirts for me",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (query: string) => void;
  isPending?: boolean;
}

function AISearchDialog({ open, onOpenChange, onSearch, isPending }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-6 sm:max-w-lg">
        <DialogHeader className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-linear-to-br from-violet-500 to-blue-600 text-white">
              <Sparkles className="size-5" />
            </span>
            <DialogTitle className="text-xl">AI Product Search</DialogTitle>
          </div>
          <DialogDescription>
            Describe what you're looking for and our AI will find the perfect
            products for you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'A wireless headphone for gaming with good bass'"
              className="h-12 pl-10"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full bg-linear-to-r from-purple-600 to-blue-600 text-base text-white hover:from-purple-500 hover:to-blue-500"
          >
            <Sparkles className="size-4" />
            {isPending ? "Searching..." : "Search with AI"}
          </Button>
        </form>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setQuery(example)}
                className="rounded-full bg-muted px-3 py-1.5 text-xs transition-colors hover:bg-primary/20"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AISearchDialog;
