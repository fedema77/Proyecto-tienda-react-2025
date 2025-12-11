import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useProducts } from "../context/ProductsContext";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";

const PER_PAGE = 6;

export default function Home() {
  const { products } = useProducts();
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.reason === "admin") {
      toast.error("Solo el usuario Admin puede acceder al área de gestión.", {
        autoClose: 2400,
      });
    }
  }, [location.state]);

  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const pageItems = products.slice(start, end);

  return (
    <section className="lh-page">
      <h2 className="lh-section-title">Colección Luz de Hoja</h2>
      <p className="lh-section-subtitle">
        Plantas curadas para interiores luminosos, envíos en CABA y GBA.
      </p>
      <ProductGrid products={pageItems} />
      <Pagination
        totalItems={products.length}
        itemsPerPage={PER_PAGE}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  );
}
