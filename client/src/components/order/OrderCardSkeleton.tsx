function OrderCardSkeleton() {
  return (
    <div
      className="animate-pulse space-y-4 rounded-xl border border-primary/15 bg-primary/10 p-6"
      aria-hidden
    >
      <div className="flex justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-64 max-w-full rounded bg-primary/15" />
          <div className="h-4 w-32 rounded bg-primary/15" />
        </div>
        <div className="h-10 w-28 rounded bg-primary/15" />
      </div>
      <div className="h-20 rounded-lg bg-primary/15" />
      <div className="flex gap-3">
        <div className="h-8 w-24 rounded-md bg-primary/15" />
        <div className="h-8 w-24 rounded-md bg-primary/15" />
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
