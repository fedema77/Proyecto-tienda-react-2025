import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Header() {
  const { user, isAuth, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    toast.info("Sesión cerrada.", { autoClose: 1800 });
  };

  const goCart = () => {
    navigate("/carrito");
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <header className="lh-header">
      <div className="lh-header-inner">
        <div className="lh-brand">
          <div className="lh-logo-mark">🍃</div>
          <div>
            <div className="lh-logo-text-main">Luz de Hoja</div>
            <div className="lh-logo-text-sub">Plant Boutique</div>
          </div>
        </div>

        <nav className="lh-nav">
          <div className="lh-nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "lh-nav-link " + (isActive ? "lh-nav-link-active" : "")
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                "lh-nav-link " + (isActive ? "lh-nav-link-active" : "")
              }
            >
              Carrito
            </NavLink>
            {isAuth && user?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  "lh-nav-link " + (isActive ? "lh-nav-link-active" : "")
                }
              >
                Admin
              </NavLink>
            )}
          </div>

          {/* Carrito header */}
          <button className="lh-cart-header" onClick={goCart} aria-label="Carrito">
            <FaShoppingCart size={16} />
            {totalCount > 0 && (
              <span className="lh-cart-header-badge">{totalCount}</span>
            )}
          </button>

          {/* Auth: INGRESAR / avatar */}
          {isAuth ? (
            <button className="lh-avatar-chip" onClick={handleLogout}>
              <span className="lh-avatar-circle">{firstLetter}</span>
              <span>{user.name}</span>
            </button>
          ) : (
            <button className="lh-auth-btn" onClick={handleLoginClick}>
              <span>Ingresar</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
