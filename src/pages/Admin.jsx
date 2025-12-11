import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import { toast } from "react-toastify";
import ProductFormModal from "../components/ProductFormModal";

export default function Admin() {
  const { products, createProduct, updateProduct, deleteProduct } =
    useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    deleteProduct(id);
    toast.info("Producto eliminado.", { autoClose: 1600 });
  };

  const handleSubmit = (data) => {
    if (editing) {
      updateProduct(editing.id, data);
      toast.success("Producto actualizado.", { autoClose: 1800 });
    } else {
      createProduct(data);
      toast.success("Producto creado.", { autoClose: 1800 });
    }
    setModalOpen(false);
    setEditing(null);
  };

  return (
    <section className="lh-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "0.5rem",
          marginBottom: "0.75rem",
          alignItems: "center",
        }}
      >
        <div>
          <h2 className="lh-section-title">Gestión de catálogo</h2>
          <p className="lh-section-subtitle">
            Solo visible para Admin · Crear, editar o eliminar plantas.
          </p>
        </div>
        <button className="lh-btn lh-btn-primary" onClick={handleNew}>
          Nuevo producto
        </button>
      </div>

      <div className="lh-cart-list">
        {products.map((p) => (
          <div key={p.id} className="lh-cart-item">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="lh-cart-thumb"
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{p.name}</div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  marginTop: "0.15rem",
                }}
              >
                ${p.price.toLocaleString("es-AR")}
              </div>
            </div>
            <button
              className="lh-btn lh-btn-soft"
              onClick={() => handleEdit(p)}
            >
              Editar
            </button>
            <button
              className="lh-btn lh-btn-ghost"
              onClick={() => handleDelete(p.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        initialProduct={editing}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
