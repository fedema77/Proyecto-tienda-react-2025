import { useParams } from "react-router-dom";

export default function ProductoDetalle() {
  const { id } = useParams();
  return (
    <section className="container stack-16">
      <h2>Detalle del producto #{id}</h2>
      <p>Información del producto seleccionado.</p>
    </section>
  );
}
