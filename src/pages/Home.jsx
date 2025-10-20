import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, login, logout, isAuth } = useAuth();

  return (
    <section className="container stack-16">
      <h2>Home</h2>
      {isAuth ? (
        <div className="stack-16">
          <p>Hola, {user.email}</p>
          <button className="btn" onClick={logout}>Salir</button>
        </div>
      ) : (
        <button className="btn btn--primary" onClick={() => login("demo@tienda.com")}>
          Entrar
        </button>
      )}
    </section>
  );
}
