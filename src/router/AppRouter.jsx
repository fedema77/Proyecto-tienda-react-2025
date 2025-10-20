import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Productos from "../pages/Productos";
import ProductoDetalle from "../pages/ProductoDetalle";
import App from "../App";

export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* La barra de navegación vive en Header (dentro de App) */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="productos/:id" element={<ProductoDetalle />} />
          <Route path="*" element={<h2 className="container">404</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
