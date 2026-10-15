import { Route, Routes } from "react-router-dom";
import PlaceholderPage from "@/components/PlaceHolderPage";
import StorefrontLayout from "@/layouts/StoreFrontLayout";
import Home from "@/pages/Home";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      {/* Storefront */}
      <Route element={<StorefrontLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<PlaceholderPage title="Products" />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route
          path="product/:id"
          element={<PlaceholderPage title="Product Details" />}
        />
        <Route
          path="cart"
          element={<PlaceholderPage title="Shopping Cart" />}
        />
        <Route path="checkout" element={<PlaceholderPage title="Checkout" />} />
        <Route path="orders" element={<PlaceholderPage title="My Orders" />} />
        <Route path="about" element={<PlaceholderPage title="About" />} />
        <Route path="faq" element={<PlaceholderPage title="FAQ" />} />
        <Route path="contact" element={<PlaceholderPage title="Contact" />} />
      </Route>

      {/* Seller panel: <Route path="/seller/*" ...> goes here later */}
      {/* Admin panel: <Route path="/admin/*" ...> goes here last */}

      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  );
}

export default App;
