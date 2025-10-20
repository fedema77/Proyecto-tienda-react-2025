import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header({ title = "Tienda React" }) {
  const { isAuth } = useAuth();
  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/productos">Productos</Link>
        {isAuth && <Link to="/perfil">Perfil</Link>}
      </nav>
    </header>
  );
}
