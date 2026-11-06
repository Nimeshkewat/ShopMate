import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

function StorefrontLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Suspense fallback={<Spinner size="xl" />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default StorefrontLayout;
