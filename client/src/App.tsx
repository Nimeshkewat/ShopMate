import { Route, Routes } from "react-router-dom";
import PlaceholderPage from "@/components/PlaceHolderPage";
import StorefrontLayout from "@/layouts/StoreFrontLayout";
import Home from "@/pages/Home";
import ResetPassword from "./pages/ResetPassword";
import Products from "./pages/Products";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import {
  AdminRoute,
  GuestRoute,
  PrivateRoute,
  SellerRoute,
} from "./protected-routes/AuthGuard";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import BecomeSeller from "./pages/seller/BecomeSeller";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      {/* Storefront */}
      <Route element={<StorefrontLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route
          path="reset-password/:token"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="order-success/:id"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="orders"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="orders/:id"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="upgrade-to-seller"
          element={
            <PrivateRoute>
              <BecomeSeller />
            </PrivateRoute>
          }
        />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Seller panel*/}
      <Route
        path="/seller/*"
        element={
          <SellerRoute>
            <PlaceholderPage title="Seller Layout" />
          </SellerRoute>
        }
      ></Route>

      {/* Seller panel*/}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <PlaceholderPage title="Admin Layout" />
          </AdminRoute>
        }
      ></Route>

      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  );
}

export default App;
