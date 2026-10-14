import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/context/ThemeContext";
import { mockCartItems } from "../mock/storeFront";
import CartSheet, { type CartItem } from "@/components/cart/CartSheet";
import MenuSheet from "@/layouts/MenuSheet";
import SearchDialog from "@/components/product/SearchDialog";
import { useAuth } from "@/context/AuthContext";
import AuthDialog from "@/components/auth/AuthDialog";
import ProfileSheet from "@/components/home/ProfileSheet";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // TODO: replace with your cart query hook
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const cartCount = cartItems.reduce((n, i) => n + i.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/60 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>

          <Link to="/" className="text-xl font-bold text-primary sm:text-2xl">
            ShopMate
          </Link>

          <div className="flex items-center justify-end">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
            >
              <Search className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                isAuthenticated ? setProfileOpen(true) : setAuthOpen(true)
              }
              aria-label={isAuthenticated ? "Open profile" : "Sign in"}
            >
              <User className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <MenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cartItems}
        onChange={setCartItems}
      />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <ProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}

export default Navbar;
