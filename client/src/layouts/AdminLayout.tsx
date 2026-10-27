import { useState } from "react";
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
    <div className="min-h-screen bg-muted/40 lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="hidden p-3 lg:block">
        <div className="sticky top-3 h-[calc(100vh-1.5rem)]">
          <AdminSidebar />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
            <nav aria-label="Breadcrumb" className="text-sm">
              <span className="text-muted-foreground">
                {user?.username ?? "Admin"}
              </span>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="font-medium">{getTitle(pathname)}</span>
            </nav>
          </div>

          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="size-10 rounded-full object-cover"
            />
          ) : (
            <span className="grid size-10 place-items-center rounded-full bg-amber-400 font-semibold text-amber-950">
              {user?.username?.charAt(0).toUpperCase() ?? "A"}
            </span>
          )}
        </header>

        <main className="flex-1 px-4 pb-10 sm:px-8">
          <Outlet />
        </main>
      </div>

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
