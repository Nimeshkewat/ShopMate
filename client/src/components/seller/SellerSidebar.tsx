import ThemeToggle from "@/context/ThemeContext";
import {
  ArrowLeft,
  LayoutDashboardIcon,
  ListOrdered,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

function SellerSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    { name: "Orders", path: "/seller/orders", icon: <ListOrdered /> },
    { name: "Products", path: "/seller/products", icon: <Package /> },
  ];

  return (
    <aside className="w-16 md:w-64 border-r border-sidebar-border h-screen bg-sidebar text-sidebar-foreground flex flex-col justify-between transition-colors duration-300">
      <div className="p-4">
        {/* Sidebar Header / Brand */}
        <div className="mb-8 flex items-center justify-between  font-bold text-xl tracking-wide text-primary">
          <span className="hidden md:inline">Seller Panel</span>
          <ThemeToggle />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center justify-center md:justify-start gap-4 px-3 py-3 rounded-lg transition-all duration-200 group text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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

      {/* Footer System */}
      <div className="p-4 border-t border-sidebar-border">
        <Link
          to="/"
          className="hidden md:flex items-center gap-2 text-lg text-muted-foreground"
        >
          <ArrowLeft />
          Back
        </Link>
        <Link to="/" className="md:hidden text-lg text-muted-foreground">
          <ArrowLeft />
        </Link>
      </div>
    </aside>
  );
}

export default SellerSidebar;
