import { Link } from "react-router-dom";
const mock = [{ id: 1, name: "Zapatillas" }, { id: 2, name: "Remera" }];

export default function Productos() {
  return (
    <section className="container stack-16">
      <h2>Productos</h2>
      <ul className="list">
        {mock.map(p => (
          <li key={p.id}>
            <Link to={`/productos/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
