import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalAmount, removeFromCart, clearCart } = useCart();

  return (
    <section className="lh-page">
      <h2 className="lh-section-title">Carrito</h2>
      {items.length === 0 ? (
        <p className="lh-section-subtitle">
          Aún no agregaste plantas a tu carrito.
        </p>
      ) : (
        <>
          <div className="lh-cart-list">
            {items.map((it) => (
              <div key={it.id} className="lh-cart-item">
                <img
                  src={it.imageUrl}
                  alt={it.name}
                  className="lh-cart-thumb"
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                    {it.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      marginTop: "0.15rem",
                    }}
                  >
                    <span>Cantidad: {it.quantity}</span>
                    <span>
                      ${(it.price * it.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
                <button
                  className="lh-btn lh-btn-ghost"
                  onClick={() => removeFromCart(it.id)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.9rem",
            }}
          >
            <div>
              Total:{" "}
              <strong>
                ${totalAmount.toLocaleString("es-AR")}
              </strong>
            </div>
            <button className="lh-btn lh-btn-ghost" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </section>
  );
}
