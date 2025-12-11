import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function FloatingCartButton() {
  const { totalCount } = useCart();
  const navigate = useNavigate();

  if (totalCount === 0) return null;

  return (
    <div className="lh-cart-floating">
      <button
        className="lh-cart-floating-btn"
        onClick={() => navigate("/carrito")}
        aria-label="Ir al carrito"
      >
        <FaShoppingBag />
        <span className="lh-cart-floating-badge">{totalCount}</span>
      </button>
    </div>
  );
}
