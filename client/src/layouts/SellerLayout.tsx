import SellerSidebar from "@/components/seller/SellerSidebar";
import { Outlet } from "react-router-dom";

function SellerLayout() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <SellerSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerLayout;
