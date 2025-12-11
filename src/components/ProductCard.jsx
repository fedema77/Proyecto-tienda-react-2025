import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="lh-product-card">
      <div className="lh-product-img-wrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="lh-product-img"
        />
      </div>
      <div className="lh-product-body">
        <h3 className="lh-product-name">{product.name}</h3>
        <p className="lh-product-desc">{product.description}</p>
        <div className="lh-product-footer">
          <span className="lh-price">
            ${product.price.toLocaleString("es-AR")}
          </span>
          <Link
            to={`/producto/${product.id}`}
            className="lh-btn lh-btn-soft"
          >
            Ver más
          </Link>
        </div>
      </div>
    </article>
  );
}
