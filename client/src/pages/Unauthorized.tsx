interface UnauthorizedPageProps {
  onGoBack?: () => void;
  onGoHome?: () => void;
  resourceName?: string;
}

function Unauthorized({
  onGoBack = () => window.history.back(),
  onGoHome = () => (window.location.href = "/"),
  resourceName,
}: UnauthorizedPageProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6 transition-colors duration-200">
      <div className="bg-card border-border w-full max-w-md text-center rounded-2xl border p-8 shadow-lg md:p-10">
        {/* Shield Warning Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/20 animate-bounce">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Typography */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          403
        </h1>
        <h2 className="mt-2 text-xl font-bold tracking-tight">Access Denied</h2>

        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          You do not have the required permissions to access this resource
          {resourceName ? (
            <span className="font-mono bg-muted text-foreground mx-1 px-1.5 py-0.5 rounded text-xs">
              ({resourceName})
            </span>
          ) : (
            ""
          )}
          . Please contact your administrator if you believe this is a mistake.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onGoBack}
            className="bg-secondary text-secondary-foreground border-border hover:bg-secondary/80 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors"
          >
            ← Go Back
          </button>
          <button
            onClick={onGoHome}
            className="bg-primary text-primary-foreground hover:opacity-90 rounded-md px-4 py-2.5 text-sm font-medium shadow-xs transition-opacity"
          >
            Return Home
          </button>
        </div>
      </div>

      {/* Decorative footer token */}
      <p className="text-muted-foreground/40 mt-8 text-xs font-mono tracking-wider">
        SECURITY_EXCEPTION // ID: AUTH_403
      </p>
    </div>
  );
}

export default Unauthorized;
