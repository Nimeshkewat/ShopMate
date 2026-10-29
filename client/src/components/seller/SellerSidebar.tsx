import ThemeToggle from "@/context/ThemeContext";
import { useLogout } from "@/hooks/auth/useLogout";
import {
  ArrowLeft,
  LayoutDashboardIcon,
  ListOrdered,
  LogOut,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

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
            <Link
              title={item.name}
              onClick={() => item.name === "Logout" && logout.mutate()}
              key={item.name}
              to={item.path}
              className={`${item.name === "Logout" && "text-destructive bg-red-600 not-dark:text-white"} flex items-center justify-center md:justify-start gap-4 px-3 py-3 rounded-lg transition-all duration-200 group text-sidebar-foreground ${item.name === "Logout" ? "hover:bg-red-700" : "hover:bg-sidebar-accent"} hover:text-sidebar-accent-foreground`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="hidden md:inline font-medium text-sm">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default SellerSidebar;
