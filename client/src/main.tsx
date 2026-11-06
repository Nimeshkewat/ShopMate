import { StrictMode, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {
  onlineManager,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";
import AuthProvider from "./context/AuthContext.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: true },
  },
});

const subscribeToOnlineStatus = (onStoreChange: () => void) =>
  onlineManager.subscribe(onStoreChange);

const getOnlineStatus = () => onlineManager.isOnline();
function useOnlineStatus() {
  return useSyncExternalStore(
    subscribeToOnlineStatus,
    getOnlineStatus,
    () => true,
  );
}

function OfflineNotice() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-0 z-100 bg-amber-100 px-4 py-2 text-center text-sm text-amber-950 shadow"
    >
      You’re offline. Some features may be unavailable. Pending requests will
      resume when your connection returns.
    </div>
  );
}

function AppErrorFallback() {
  const isOnline = useOnlineStatus();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">
        {isOnline ? "Something went wrong" : "You’re offline"}
      </h1>
      <p className="max-w-md text-muted-foreground">
        {isOnline
          ? "The app hit an unexpected error. Reload the page to try again."
          : "The app couldn’t load. Check your connection, then reload the page."}
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Reload page
      </button>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ErrorBoundary fallbackRender={() => <AppErrorFallback />}>
          <AuthProvider>
            <OfflineNotice />
            <Toaster />
            <App />
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
