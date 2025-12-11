import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, isAuth, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  const closeMobileMenu = () => setIsNavOpen(false);

  const goCart = () => {
    navigate("/carrito");
    closeMobileMenu();
  };

  const handleLogin = () => {
    navigate("/login");
    closeMobileMenu();
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <>
      <header className="lh-header">
        <div className="lh-header-inner">
          {/* Marca */}
          <div
            className="lh-brand"
            onClick={() => {
              navigate("/");
              closeMobileMenu();
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="lh-logo-mark">🍃</div>
            <div>
              <div className="lh-logo-text-main">Luz de Hoja</div>
              <div className="lh-logo-text-sub">Plant Boutique</div>
            </div>
          </div>

          <nav className="lh-nav">
            {/* Links desktop */}
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
              {isAdmin && (
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

            {/* Carrito (icono header) */}
            <button
              className="lh-cart-header"
              onClick={goCart}
              aria-label="Carrito"
            >
              <FaShoppingCart size={16} />
              {totalCount > 0 && (
                <span className="lh-cart-header-badge">{totalCount}</span>
              )}
            </button>

            {/* Avatar / Ingresar en desktop */}
            {isAuth ? (
              <button className="lh-avatar-chip" onClick={handleLogout}>
                <span className="lh-avatar-circle">{firstLetter}</span>
                <span>{user.name}</span>
              </button>
            ) : (
              <button className="lh-auth-btn" onClick={handleLogin}>
                Ingresar
              </button>
            )}

            {/* Botón hamburguesa (solo mobile, se oculta por CSS en desktop) */}
            <button
              className="lh-nav-toggle"
              type="button"
              aria-label={isNavOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isNavOpen}
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              {isNavOpen ? <FiX /> : <FiMenu />}
            </button>
          </nav>
        </div>
      </header>

      {/* Menú mobile desplegable */}
      {isNavOpen && (
        <div className="lh-nav-mobile">
          <div className="lh-nav-mobile-inner">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "lh-nav-link-mobile " +
                (isActive ? "lh-nav-link-mobile-active" : "")
              }
              onClick={closeMobileMenu}
            >
              Inicio
            </NavLink>
            <button
              className="lh-nav-link-mobile"
              onClick={goCart}
              type="button"
            >
              Carrito {totalCount > 0 ? `(${totalCount})` : ""}
            </button>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  "lh-nav-link-mobile " +
                  (isActive ? "lh-nav-link-mobile-active" : "")
                }
                onClick={closeMobileMenu}
              >
                Admin
              </NavLink>
            )}

            {/* Auth también accesible desde el menú */}
            {isAuth ? (
              <button
                type="button"
                className="lh-nav-link-mobile"
                onClick={handleLogout}
              >
                Cerrar sesión ({user.name})
              </button>
            ) : (
              <button
                type="button"
                className="lh-nav-link-mobile"
                onClick={handleLogin}
              >
                Ingresar
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
