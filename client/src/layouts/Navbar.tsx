import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/context/ThemeContext";
import { getErrorMessage } from "@/api/apiClient";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/hooks/cart/useCart";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";
import { useUpdateCartItem } from "@/hooks/cart/useUpdateCartItem";
import AuthDialog from "@/components/auth/AuthDialog";
import CartSheet from "@/components/cart/CartSheet";
import SearchDialog from "@/components/product/SearchDialog";
import ProfileSheet from "@/components/home/ProfileSheet";
import MenuSheet from "./MenuSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/user/useProfile";
import { Spinner } from "@/components/ui/spinner";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const { data: cartData, isLoading: cartLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveFromCart();
  const { data: profile, isLoading } = useProfile();

  const items = isAuthenticated ? (cartData?.cart?.items ?? []) : [];
  const cartCount = items.reduce((n, i) => n + i.quantity, 0);

  const handleError = (error: unknown) => toast.error(getErrorMessage(error));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          {/* Left: hamburger */}
          <div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </Button>
          </div>

          {/* Center: Brand */}
          <Link
            to="/"
            className="mr-6 md:mr-0 text-lg font-bold tracking-tight text-primary sm:text-xl"
          >
            ShopMate
          </Link>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-0.5">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
            >
              <Search className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground"
              onClick={() =>
                isAuthenticated ? setProfileOpen(true) : setAuthOpen(true)
              }
              aria-label={isAuthenticated ? "Open profile" : "Sign in"}
            >
              {!isAuthenticated ? (
                <User className="size-4" />
              ) : isLoading ? (
                <span>
                  <Spinner size="sm" />
                </span>
              ) : (
                <Avatar className="size-4 md:size-6">
                  <AvatarImage src={profile?.user.avatar} />
                  <AvatarFallback>
                    {profile?.user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative size-8 text-muted-foreground hover:text-foreground"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingCart className="size-4" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground tabular-nums">
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
        items={items}
        isLoading={isAuthenticated && cartLoading}
        onQuantityChange={(productId, quantity) =>
          updateItem.mutate({ productId, quantity }, { onError: handleError })
        }
        onRemove={(productId) =>
          removeItem.mutate({ productId }, { onError: handleError })
        }
      />
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <ProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
