import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p className="lh-section-subtitle">No hay productos para mostrar.</p>;
  }
  return (
    <div className="lh-products-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
