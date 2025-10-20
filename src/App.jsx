import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header title="Tienda React" />
      <main className="main">
        <section className="container stack-16">
          <h2>Inicio</h2>
          <p>Este es el comienzo de nuestra app.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
