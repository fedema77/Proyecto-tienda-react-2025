import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuth, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, reason: "auth" }}
      />
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <Navigate
        to="/"
        replace
        state={{ reason: "admin" }}
      />
    );
  }

  return children;
}
