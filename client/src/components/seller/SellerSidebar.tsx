import ThemeToggle from "@/context/ThemeContext";
import { useLogout } from "@/hooks/auth/useLogout";
import { cn } from "cn";
import {
  ArrowLeft,
  LayoutDashboardIcon,
  ListOrdered,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function SellerSidebar() {
  const logout = useLogout();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    { name: "Orders", path: "/seller/orders", icon: <ListOrdered /> },
    { name: "Products", path: "/seller/products", icon: <Package /> },
    { name: "Shop Settings", path: "/seller/settings", icon: <Settings /> },
    { name: "Back to store", path: "/", icon: <ArrowLeft /> },
    { name: "Logout", path: "/", icon: <LogOut /> },
  ];

  return (
    <aside className="w-16  md:w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col justify-between transition-colors duration-300">
      <div className="p-4">
        {/* Sidebar Header / Brand */}
        <div className="mb-8  flex items-center justify-between  font-bold text-xl tracking-wide text-primary">
          {/* <Link to="/" className="text-lg text-muted-foreground">
            <ArrowLeft />
          </Link> */}
          <span className="hidden md:inline font-extrabold text-2xl">
            Seller Panel
          </span>
          <ThemeToggle />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              title={item.name}
              onClick={() => item.name === "Logout" && logout.mutate()}
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )
              }
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="hidden md:inline font-medium text-sm">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default SellerSidebar;
