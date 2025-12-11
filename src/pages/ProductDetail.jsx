import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

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
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
        }}
      >
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="lh-product-img"
            style={{ maxHeight: "320px", width: "100%" }}
          />
        </div>
        <div className="lh-form">
          <div>
            <h2 className="lh-section-title">{product.name}</h2>
            <p className="lh-section-subtitle">{product.description}</p>
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: "1rem" }}>
              ${product.price.toLocaleString("es-AR")}
            </p>
          </div>
          <button
            className="lh-btn lh-btn-primary lh-btn-full"
            onClick={handleAdd}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
