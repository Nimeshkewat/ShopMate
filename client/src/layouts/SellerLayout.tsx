import { Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProfile } from "@/hooks/user/useProfile";
import SellerSidebar from "@/components/seller/SellerSidebar";
import { Spinner } from "@/components/ui/spinner";

const titles: Record<string, string> = {
  "/seller/dashboard": "Dashboard",
  "/seller/orders": "Orders",
  "/seller/products": "Products",
  "/seller/settings": "Shop Settings",
};

function SellerLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();
  const { data } = useProfile();
  const user = data?.user;
  const title =
    Object.entries(titles)
      .filter(([path]) => pathname === path || pathname.startsWith(`${path}/`))
      .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? "Seller";

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="hidden p-3 lg:block">
        <div className="sticky top-3 h-[calc(100vh-1.5rem)]">
          <SellerSidebar />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 lg:hidden"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </Button>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm"
            >
              <span className="text-muted-foreground">
                {user?.username ?? "Seller"}
              </span>
              <span className="text-border">/</span>
              <span className="font-semibold text-foreground">{title}</span>
            </nav>
          </div>

          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="size-8 rounded-full object-cover ring-2 ring-border"
            />
          ) : (
            <div className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-primary/20">
              {user?.username?.charAt(0).toUpperCase() ?? "S"}
            </div>
          )}
        </header>

        <main className="min-w-0 flex-1 overflow-x-hidden px-4 pb-10 pt-6 sm:px-8">
          <Suspense fallback={<Spinner size="xl" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-3 [&>button]:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Seller menu</SheetTitle>
            <SheetDescription>Seller navigation</SheetDescription>
          </SheetHeader>
          <SellerSidebar onNavigate={() => setNavOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SellerLayout;
