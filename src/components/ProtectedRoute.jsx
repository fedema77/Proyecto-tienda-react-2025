import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuth, isAdmin } = useAuth();
  const location = useLocation();

  // No está logueado → mandamos a Login y dejamos una razón en el state
  if (!isAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, reason: "auth" }}
      />
    );
  }

  // Logueado pero no admin → mandamos a Home con razón
  if (requireAdmin && !isAdmin) {
    return (
      <Navigate
        to="/"
        replace
        state={{ reason: "admin" }}
      />
    );
  }

  // Todo OK → mostramos el contenido protegido
  return children;
}
