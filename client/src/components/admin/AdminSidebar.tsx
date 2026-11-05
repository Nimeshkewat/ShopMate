import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Package,
  Store,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/api/apiClient";
import { useLogout } from "@/hooks/auth/useLogout";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/context/ThemeContext";

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  { to: "/admin/sellers", label: "Sellers", icon: Store },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ListOrdered },
];

interface Props {
  onNavigate?: () => void;
}

function AdminSidebar({ onNavigate }: Props) {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () =>
    logout(undefined, {
      onSuccess: (data) => {
        toast.success(data?.message || "Logged out successfully");
        navigate("/", { replace: true });
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });

  return (
    <div className="flex h-full flex-col rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border/60">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="grid size-7 place-items-center rounded-lg bg-primary">
            <span className="text-xs font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Admin Panel
          </span>
        </div>
        <ThemeToggle />
      </div>

      <nav aria-label="Admin" className="space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-1.5 pt-6 border-t border-border/60">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          replace
        >
          Back to store
        </Link>
        <Button
          onClick={handleLogout}
          disabled={isPending}
          variant="outline"
          className="h-9 w-full border-destructive/30 bg-destructive/8 text-destructive hover:bg-destructive/15 hover:border-destructive/50 shadow-none"
        >
          <LogOut className="size-3.5" />
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}
export default AdminSidebar;
