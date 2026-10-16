export default function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-xl border border-primary/15 bg-primary/10 p-3"
      aria-hidden
    >
      <div className="aspect-square rounded-lg bg-primary/15" />
      <div className="mt-3 h-4 w-3/4 rounded bg-primary/15" />
      <div className="mt-2 h-3 w-1/3 rounded bg-primary/15" />
      <div className="mt-3 h-5 w-1/4 rounded bg-primary/15" />
    </div>
  );
}
