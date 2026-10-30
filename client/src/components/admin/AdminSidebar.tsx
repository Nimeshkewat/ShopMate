import { NavLink, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () =>
    logout(undefined, {
      onSuccess: async (data) => {
        toast.success(data?.message || "Logged out successfully");
        await queryClient.invalidateQueries({});
        navigate("/");
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });

  return (
    <div className="flex h-full flex-col rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex justify-between">
        <p className="border-b px-2 pb-4 text-xl font-bold">Admin Panel</p>
        <ThemeToggle />
      </div>

      <nav aria-label="Admin" className="mt-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2 pt-6">
        <Link
          to="/"
          onClick={onNavigate}
          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          Back to store
        </Link>
        <Button
          onClick={handleLogout}
          disabled={isPending}
          className="h-10 w-full bg-red-600 text-white hover:bg-red-700"
        >
          <LogOut className="size-4" />
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}
export default AdminSidebar;
