interface NotFoundPageProps {
  onGoHome?: () => void;
}

function NotFound({
  onGoHome = () => (window.location.href = "/"),
}: NotFoundPageProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6 transition-colors duration-200">
      <div className="bg-card border-border w-full max-w-md text-center rounded-2xl border p-8 shadow-lg md:p-10">
        {/* Animated Compass Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-primary border border-accent/20">
          <svg
            className="h-8 w-8 animate-spin"
            style={{ animationDuration: "3s" }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9 9 0 100-18 9 9 0 000 18z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3"
            />
          </svg>
        </div>

        {/* 404 Header */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          404
        </h1>
        <h2 className="mt-2 text-xl font-bold tracking-tight">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          The link you followed might be broken, or the page may have been moved
          or deleted. Double-check the URL or head back home.
        </p>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={onGoHome}
            className="bg-primary text-primary-foreground hover:opacity-90 w-full sm:w-auto rounded-md px-6 py-2.5 text-sm font-medium shadow-xs transition-opacity"
          >
            Take Me Home
          </button>
        </div>
      </div>

      <p className="text-muted-foreground/40 mt-8 text-xs font-mono tracking-wider">
        ROUTE_EXCEPTION // STATUS: NOT_FOUND
      </p>
    </div>
  );
}

export default NotFound;
