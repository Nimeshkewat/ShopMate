import { NavLink } from "react-router-dom";
import {
  CircleHelp,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  ListOrdered,
  Package,
  Phone,
  ShoppingCart,
  Store,
  LogOut,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProfile } from "@/hooks/user/useProfile";
import { useLogout } from "@/hooks/auth/useLogout";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: Package },
  { to: "/shops", label: "Shops", icon: Store },
  { to: "/about", label: "About", icon: Info },
  { to: "/faq", label: "FAQ", icon: CircleHelp },
  { to: "/contact", label: "Contact", icon: Phone },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/orders", label: "My orders", icon: ListOrdered },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn: () => void;
}

function MenuSheet({ open, onOpenChange, onSignIn }: Props) {
  const { isAuthenticated } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const { data, isError } = useProfile();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-72 gap-0 border-r border-border/60 bg-card p-0 shadow-xl sm:max-w-xs [&>button]:right-4 [&>button]:top-4 [&>button]:rounded-lg [&>button]:bg-secondary [&>button]:p-1.5 [&>button]:text-muted-foreground"
      >
        <SheetHeader className="border-b border-border/60 p-5">
          <SheetTitle className="flex items-center gap-2.5 text-base font-semibold">
            <div className="grid size-6 place-items-center rounded-md bg-primary">
              <span className="text-[10px] font-bold text-primary-foreground">
                S
              </span>
            </div>
            ShopMate
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav className="space-y-0.5 p-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => onOpenChange(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              <Icon className="size-4 shrink-0" />
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
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              {data.user.role === "user" ? (
                <Store className="size-4 shrink-0" />
              ) : (
                <LayoutDashboard className="size-4 shrink-0" />
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
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )
              }
            >
              <LayoutDashboard className="size-4 shrink-0" />
              Admin Dashboard
            </NavLink>
          )}
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSignIn();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
            >
              <LogIn className="size-4 shrink-0" />
              Sign in
            </button>
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                onOpenChange(false);
                logout();
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="size-4 shrink-0" />
              Logout
            </button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MenuSheet;
