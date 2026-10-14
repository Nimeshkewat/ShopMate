function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">
        This page hasn't been built yet.
      </p>
    </div>
  );
}

export default PlaceholderPage;
