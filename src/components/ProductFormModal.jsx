import { useEffect, useState } from "react";

const EMPTY = {
  name: "",
  price: "",
  description: "",
  imageUrl: "",
};

export default function ProductFormModal({
  isOpen,
  onClose,
  initialProduct,
  onSubmit,
}) {
  const [values, setValues] = useState(EMPTY);
  const isEdit = !!initialProduct;

  useEffect(() => {
    if (isOpen) {
      setValues(
        initialProduct
          ? {
              name: initialProduct.name ?? "",
              price: initialProduct.price ?? "",
              description: initialProduct.description ?? "",
              imageUrl: initialProduct.imageUrl ?? "",
            }
          : EMPTY
      );
    }
  }, [isOpen, initialProduct]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name.trim()) return;
    if (!values.price || Number(values.price) <= 0) return;
    if (!values.description.trim()) return;
    if (!values.imageUrl.trim()) return;

    onSubmit({
      ...values,
      price: Number(values.price),
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 40,
      }}
    >
      <div className="lh-page" style={{ maxWidth: "480px", width: "100%" }}>
        <form className="lh-form" onSubmit={handleSubmit}>
          <h2 style={{ marginTop: 0 }}>
            {isEdit ? "Editar producto" : "Nuevo producto"}
          </h2>

          <div className="lh-field">
            <label className="lh-label">Nombre</label>
            <input
              name="name"
              className="lh-input"
              value={values.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="lh-field">
            <label className="lh-label">Precio (ARS)</label>
            <input
              name="price"
              type="number"
              min="0"
              className="lh-input"
              value={values.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="lh-field">
            <label className="lh-label">Descripción</label>
            <textarea
              name="description"
              className="lh-textarea"
              value={values.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="lh-field">
            <label className="lh-label">URL de imagen</label>
            <input
              name="imageUrl"
              className="lh-input"
              value={values.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "flex-end",
              marginTop: "0.5rem",
            }}
          >
            <button
              type="button"
              className="lh-btn lh-btn-ghost"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="lh-btn lh-btn-primary">
              {isEdit ? "Guardar cambios" : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
