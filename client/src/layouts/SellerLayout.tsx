import SellerSidebar from "@/components/seller/SellerSidebar";
import { Outlet } from "react-router-dom";

function SellerLayout() {
  return (
    <div className="flex min-h-screen overflow-x-hidden bg-background">
      <SellerSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerLayout;
