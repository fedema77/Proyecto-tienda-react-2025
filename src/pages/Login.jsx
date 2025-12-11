import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.reason === "auth") {
      toast.info("Necesitás iniciar sesión para continuar.", {
        autoClose: 2200,
      });
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username.trim(), password.trim());
    if (!result.ok) {
      toast.error("Credenciales inválidas. Probá Admin/admin o Marta/marta.", {
        autoClose: 2500,
      });
      return;
    }
    toast.success(`Bienvenido/a, ${result.user.name}.`, {
      autoClose: 2000,
    });

    const from = location.state?.from?.pathname ?? "/";
    navigate(from, { replace: true });
  };

  return (
    <section className="lh-page" style={{ maxWidth: "420px", margin: "0 auto" }}>
      <h2 className="lh-section-title">Ingresar</h2>
      <p className="lh-section-subtitle">
        Admin: <strong>Admin / admin</strong> · Cliente:{" "}
        <strong>Marta / marta</strong>
      </p>
      <form className="lh-form" onSubmit={handleSubmit}>
        <div className="lh-field">
          <label className="lh-label">Usuario</label>
          <input
            className="lh-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Admin o Marta"
          />
        </div>
        <div className="lh-field">
          <label className="lh-label">Contraseña</label>
          <input
            className="lh-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <button
          type="submit"
          className="lh-btn lh-btn-primary lh-btn-full"
          style={{ marginTop: "0.5rem" }}
        >
          Ingresar
        </button>
      </form>
    </section>
  );
}
