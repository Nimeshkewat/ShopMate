export default function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-xl bg-card p-3 ring-1 ring-border/60 shadow-sm"
      aria-hidden
    >
      <div className="aspect-square rounded-lg bg-muted" />
      <div className="mt-3 h-4 w-3/4 rounded bg-muted" />
      <div className="mt-2 h-3 w-1/3 rounded bg-muted" />
      <div className="mt-3 h-5 w-1/4 rounded bg-muted" />
    </div>
  );
}
