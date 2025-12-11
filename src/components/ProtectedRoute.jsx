import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuth, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    toast.warn("Necesitás iniciar sesión para acceder a esa sección.", {
      autoClose: 2200,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    toast.error("Solo el usuario Admin puede acceder al área de gestión.", {
      autoClose: 2400,
    });
    return <Navigate to="/" replace />;
  }

  return children;
}
