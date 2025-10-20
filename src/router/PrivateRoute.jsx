import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ isAuth, children }) {
  const location = useLocation();

  if (isAuth) return children;

  // 👇 avisamos por qué redirigimos
  return (
    <Navigate
      to="/"
      replace
      state={{ reason: "auth", from: location.pathname }}
    />
  );
}
