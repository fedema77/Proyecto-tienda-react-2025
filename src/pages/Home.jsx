import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const showAuthMsg = location.state?.reason === "auth";

  return (
    <section className="container stack-16">
      <h2>Home</h2>
      {showAuthMsg && (
        <div className="card state-error">
          Necesitas iniciar sesión para acceder a esa página.
        </div>
      )}
      <p>Bienvenido/a a la Tienda React.</p>
    </section>
  );
}
