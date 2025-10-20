import Header from "./components/Header";
import Footer from "./components/Footer";
import Counter from "./components/Counter";
import Posts from "./components/Posts";

export default function App() {
  return (
    <>
      <Header title="Tienda React" />
      <main className="main">
        <section className="container stack-24">
          <h2>Home</h2>
          <Counter />
          <div>
            <h3>Últimos posts</h3>
            <Posts />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
