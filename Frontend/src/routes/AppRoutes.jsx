import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import StoreLayout from "../components/layout/StoreLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Home = lazy(() => import("../pages/Home/Home"));
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Combos = lazy(() => import("../pages/Combos/Combos"));
const ProductDetails = lazy(() => import("../pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));
const Payment = lazy(() => import("../pages/Checkout/Payment"));
const OrderHistory = lazy(() => import("../pages/Orders/OrderHistory"));
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../pages/TermsConditions.jsx/TermsConditions"));

function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
      <Route element={<StoreLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/combos/:type" element={<Combos />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:orderId"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
