import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const sumar = () => setCount(c => c + 1);
  const restar = () => setCount(c => Math.max(0, c - 1));

  return (
    <div className="stack-16">
      <p>Carrito: {count} ítems</p>
      <div className="nav">
        <button className="btn btn--primary" onClick={sumar}>Agregar</button>
        <button className="btn" onClick={restar} disabled={count === 0}>Quitar</button>
      </div>
    </div>
  );
}
