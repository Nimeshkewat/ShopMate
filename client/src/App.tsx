import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "./components/ui/spinner";

//* Static imports for guards
import {
  AdminRoute,
  GuestRoute,
  PrivateRoute,
  SellerRoute,
} from "./protected-routes/AuthGuard";

//* Layouts
const StorefrontLayout = lazy(() => import("@/layouts/StoreFrontLayout"));
const SellerLayout = lazy(() => import("./layouts/SellerLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));

//* Public Pages
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("./pages/About"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const NotFound = lazy(() => import("./pages/NotFound"));

//* Store Pages
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(
  () => import("./components/product/ProductDetails"),
);
const Shops = lazy(() => import("./pages/shop/Shops"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderDetails = lazy(() => import("./components/order/OrderDetails"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

//* Seller Pages
const BecomeSeller = lazy(() => import("./pages/seller/BecomeSeller"));
const SellerDashboard = lazy(() => import("./pages/seller/SellerDashboard"));
const SellerOrders = lazy(() => import("./pages/seller/SellerOrders"));
const SellerProducts = lazy(() => import("./pages/seller/SellerProducts"));
const ShopSettings = lazy(() => import("./pages/seller/ShopSettings"));

//* Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const SellerManagement = lazy(() => import("./pages/admin/SellerManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ProductManagement = lazy(() => import("./pages/admin/ProductManagement"));
const OrderManagement = lazy(() => import("./pages/admin/OrderManagement"));

function App() {
  return (
    <Routes>
      {/* STOREFRONT */}
      <Route
        element={
          <Suspense fallback={<Spinner size="xl" />}>
            <StorefrontLayout />
          </Suspense>
        }
      >
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="shops" element={<Shops />} />
        <Route path="shops/:id" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="terms-and-conditions"
          element={<TermsAndConditions />}
        />

        {/* Protected Storefront */}
        <Route
          path="reset-password/:token"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
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
      </Route>

      {/* 2. SELLER */}
      <Route
        path="seller"
        element={
          <SellerRoute>
            <Suspense fallback={<Spinner size="xl" />}>
              <SellerLayout />
            </Suspense>
          </SellerRoute>
        }
      >
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="products" element={<SellerProducts />} />
        <Route path="settings" element={<ShopSettings />} />
      </Route>

      {/* 3. ADMIN */}
      <Route
        path="admin"
        element={
          <AdminRoute>
            <Suspense fallback={<Spinner size="xl" />}>
              <AdminLayout />
            </Suspense>
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="sellers" element={<SellerManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>

      {/* 4. GLOBAL */}
      <Route
        path="unauthorized"
        element={
          <Suspense fallback={<Spinner />}>
            <Unauthorized />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
