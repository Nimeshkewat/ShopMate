import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/hooks/cart/useCartActions";
import OrderSummary from "../components/order/OrderSummary";
import { calculateTotals } from "../utils/index";
import CartItemRow from "../components/cart/CartItemRow";

function Cart() {
  const navigate = useNavigate();
  const { items, isLoading, changeQuantity, removeItem } = useCartActions();
  const totals = calculateTotals(items);

  if (isLoading) {
    return (
      <p className="mx-auto max-w-7xl px-4 py-10 text-muted-foreground sm:px-6">
        Loading your cart...
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="text-2xl font-bold">Your Cart is Empty.</h1>
        <p className="text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button className="mt-2">
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {totals.itemCount} {totals.itemCount === 1 ? "item" : "items"} in your
        cart
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <CartItemRow
              key={item.productId}
              item={item}
              onQuantityChange={changeQuantity}
              onRemove={removeItem}
            />
          ))}
        </ul>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary totals={totals}>
            <Button
              className="h-11 w-full text-base"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
            <Button variant="ghost" className="h-11 w-full">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </OrderSummary>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
