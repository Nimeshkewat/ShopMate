import { useProfile } from "@/hooks/user/useProfile";
import { createContext, useContext, type ReactNode } from "react";

interface AuthContextValue {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isError } = useProfile();
  const isAuthenticated = !isError && data?.success ? true : false;
  const value = { isAuthenticated };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthProvider;
