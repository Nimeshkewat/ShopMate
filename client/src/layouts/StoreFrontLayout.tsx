import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function StorefrontLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default StorefrontLayout;
