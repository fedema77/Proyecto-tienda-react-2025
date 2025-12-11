import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const USERS = {
  Admin: {
    username: "Admin",
    password: "admin",
    role: "admin",
    name: "Usuario Admin",
  },
  Marta: {
    username: "Marta",
    password: "marta",
    role: "customer",
    name: "Marta",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lh_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("lh_user");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("lh_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("lh_user");
    }
  }, [user]);

  const login = (username, password) => {
    const found = USERS[username];
    if (found && found.password === password) {
      const { password: _pwd, ...safeUser } = found;
      setUser(safeUser);
      return { ok: true, user: safeUser };
    }
    return { ok: false };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
