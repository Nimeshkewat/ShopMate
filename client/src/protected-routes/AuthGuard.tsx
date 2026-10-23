import { useProfile } from "@/hooks/user/useProfile";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useProfile();
  if (isLoading) return <h2>Loading...</h2>;

  if (data?.success) {
    const role = data.user.role;
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "seller") return <Navigate to="/seller" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useProfile();
  if (isLoading) return <h2>Loading...</h2>;

  if (!data?.success) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const SellerRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useProfile();
  if (isLoading) return <h2>Loading...</h2>;

  if (data?.success) {
    const role = data.user.role;
    if (role === "seller") {
      return children;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return <Navigate to="/" replace />;
};

export const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useProfile();
  if (isLoading) return <h2>Loading...</h2>;

  if (data?.success) {
    if (data.user.role === "admin") {
      return children;
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return <Navigate to="/" replace />;
};
