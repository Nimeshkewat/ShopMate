import { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProfile } from "@/hooks/user/useProfile";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Spinner } from "@/components/ui/spinner";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/sellers": "Seller Management",
  "/admin/users": "User Management",
  "/admin/products": "Product Moderation",
  "/admin/orders": "Order Oversight",
};

// the most specific matching path wins, so /admin/users/123 still reads "User Management"
const getTitle = (pathname: string) =>
  Object.entries(titles)
    .filter(([path]) => pathname === path || pathname.startsWith(`${path}/`))
    .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? "Admin";

function AdminLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();
  const { data } = useProfile();
  const user = data?.user;

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[272px_1fr]">
      {/* Sticky sidebar (desktop) */}
      <aside className="hidden p-3 lg:block">
        <div className="sticky top-3 h-[calc(100vh-1.5rem)]">
          <AdminSidebar />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex min-w-0 flex-col">
        {/* Top header bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-background/80 backdrop-blur-xl px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-8"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </Button>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm"
            >
              <span className="text-muted-foreground">
                {user?.username ?? "Admin"}
              </span>
              <span className="text-border">/</span>
              <span className="font-semibold text-foreground">
                {getTitle(pathname)}
              </span>
            </nav>
          </div>

          {/* Avatar */}
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="size-8 rounded-full object-cover ring-2 ring-border"
            />
          ) : (
            <div className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-primary/20">
              {user?.username?.charAt(0).toUpperCase() ?? "A"}
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 pb-10 pt-6 sm:px-8">
          <Suspense fallback={<Spinner size="xl" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      {/* Mobile nav sheet */}
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-3 [&>button]:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin menu</SheetTitle>
            <SheetDescription>Admin navigation</SheetDescription>
          </SheetHeader>
          <AdminSidebar onNavigate={() => setNavOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
export default AdminLayout;
