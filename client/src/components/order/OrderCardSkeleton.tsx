function OrderCardSkeleton() {
  return (
    <div
      className="animate-pulse space-y-4 rounded-xl bg-card p-6 ring-1 ring-border/60"
      aria-hidden
    >
      <div className="flex justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-64 max-w-full rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
        </div>
        <div className="h-10 w-28 rounded bg-muted" />
      </div>
      <div className="h-20 rounded-lg bg-muted" />
      <div className="flex gap-3">
        <div className="h-8 w-24 rounded-md bg-muted" />
        <div className="h-8 w-24 rounded-md bg-muted" />
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
