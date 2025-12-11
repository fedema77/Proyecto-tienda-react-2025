import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!product) {
    return (
      <section className="lh-page">
        <h2>Producto no encontrado</h2>
        <p>Es posible que haya sido removido del catálogo.</p>
      </section>
    );
  }

  const handleAdd = () => {
    if (!isAuth) {
      toast.info("Iniciá sesión para agregar al carrito.", {
        autoClose: 2200,
      });
      navigate("/login", { state: { from: location } });
      return;
    }
    addToCart(product);
    toast.success("Producto agregado al carrito.", { autoClose: 2000 });
  };

  return (
    <section className="lh-page">
      {/* ... resto del layout ... */}
    </section>
  );
}
