import { NavLink } from "react-router-dom";
import {
  CircleHelp,
  Home,
  Info,
  LayoutDashboard,
  ListOrdered,
  Package,
  Phone,
  ShoppingCart,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProfile } from "@/hooks/user/useProfile";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: Package },
  { to: "/about", label: "About", icon: Info },
  { to: "/faq", label: "FAQ", icon: CircleHelp },
  { to: "/contact", label: "Contact", icon: Phone },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/orders", label: "My orders", icon: ListOrdered },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MenuSheet({ open, onOpenChange }: Props) {
  const { data, isError } = useProfile();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-72 gap-0 border-r border-white/20 bg-background/40 p-0 backdrop-blur-xl sm:max-w-xs [&>button]:right-5 [&>button]:top-5 [&>button]:rounded-lg [&>button]:bg-primary/15 [&>button]:p-1.5 [&>button]:text-primary"
      >
        <SheetHeader className="p-5 pb-4">
          <SheetTitle className="text-xl">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav className="space-y-3 border-t border-white/10 p-5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => onOpenChange(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/10 px-4 py-3 text-sm font-medium transition-colors hover:bg-primary/20",
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary",
                )
              }
            >
              <Icon className="size-4" />
              {label}
            </NavLink>
          ))}
          {!isError && data?.success && data.user.role !== "admin" && (
            <NavLink
              to={
                data.user.shopId === null ||
                data.user.shopId?.isApproved === false
                  ? "/upgrade-to-seller"
                  : "/seller/dashboard"
              }
              onClick={() => onOpenChange(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/10 px-4 py-3 text-sm font-medium transition-colors hover:bg-primary/20",
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary",
                )
              }
            >
              {data.user.role === "user" ? (
                <Store className="size-4" />
              ) : (
                <LayoutDashboard className="size-4" />
              )}
              {data.user.role === "user"
                ? "Become a seller"
                : "Seller Dashboard"}
            </NavLink>
          )}
          {!isError && data?.success && data.user.role === "admin" && (
            <NavLink
              to={"/admin/dashboard"}
              onClick={() => onOpenChange(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/10 px-4 py-3 text-sm font-medium transition-colors hover:bg-primary/20",
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary",
                )
              }
            >
              <LayoutDashboard className="size-4" />
              Admin Dashboard
            </NavLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MenuSheet;
