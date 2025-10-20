import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", { signal: ctrl.signal })
      .then(res => res.ok ? res.json() : Promise.reject(new Error("Error al cargar")))
      .then(data => setPosts(data))
      .catch(err => {
        // 👇 Ignoramos la cancelación provocada por StrictMode/unmount
        if (err.name !== "AbortError" && err.message !== "The user aborted a request.") {
          setError(err);
        }
      })
      .finally(() => setCargando(false));

    return () => ctrl.abort();
  }, []);

  if (cargando) return <p className="state-info">Cargando…</p>;
  if (error) return <p className="state-error">{String(error)}</p>;

  return (
    <ul className="list stack-16">
      {posts.map(p => <li key={p.id} className="card">{p.title}</li>)}
    </ul>
  );
}
