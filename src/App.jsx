import { Outlet, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header title="Tienda React" />
      <main className="main">
        <nav className="container nav" aria-label="principal">
          <Link to="/">Home</Link>
          <Link to="/productos">Productos</Link>
        </nav>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
