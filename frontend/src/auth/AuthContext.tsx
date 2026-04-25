import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { api } from "../api/client";

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("lb_token"));

  const value = useMemo<AuthContextType>(
    () => ({
      token,
      isAuthenticated: !!token,
      async login(email, password) {
        const { data } = await api.post("/api/auth/login", { email, password });
        localStorage.setItem("lb_token", data.access_token);
        setToken(data.access_token);
      },
      logout() {
        localStorage.removeItem("lb_token");
        setToken(null);
      },
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
