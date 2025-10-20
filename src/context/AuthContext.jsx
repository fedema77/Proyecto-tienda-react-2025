import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = (email) => setUser({ email });
  const logout = () => setUser(null);

  const value = useMemo(() => ({
    user, login, logout, isAuth: !!user
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
