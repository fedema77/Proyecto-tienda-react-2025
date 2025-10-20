import { Link } from "react-router-dom";

export default function Header({ title = "Tienda React" }) {
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/productos">Productos</Link>
        {/* 👇 lo mostramos siempre en Clase 07 para poder probar */}
        <Link to="/perfil">Perfil</Link>
      </nav>
    </header>
  );
}
