import { createContext, useContext, useState } from "react";

const ProductsContext = createContext(null);

const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    price: 32000,
    description: "Follaje perforado, ideal para interiores luminosos.",
    imageUrl:
      "https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Ficus Lyrata Mini",
    price: 41000,
    description: "Versión compacta para espacios pequeños y luminosos.",
    imageUrl:
      "https://images.pexels.com/photos/5699663/pexels-photo-5699663.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Helecho Boston Premium",
    price: 18500,
    description: "Textura suave, perfecto para estanterías y altura.",
    imageUrl:
      "https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    name: "Set Suculentas Curadas x3",
    price: 14500,
    description: "Colección seleccionada de suculentas fáciles de cuidar.",
    imageUrl:
      "https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "5",
    name: "Olivo en Maceta Cerámica",
    price: 54000,
    description: "Toque mediterráneo en maceta artesanal esmaltada.",
    imageUrl:
      "https://images.pexels.com/photos/3076897/pexels-photo-3076897.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "6",
    name: "Calathea Velvet",
    price: 29000,
    description:
      "Hojas aterciopeladas con patrón único, amante de la humedad.",
    imageUrl:
      "https://images.pexels.com/photos/3695876/pexels-photo-3695876.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "7",
    name: "Philodendron Lime",
    price: 27000,
    description: "Verde lima vibrante para dar luz a cualquier rincón.",
    imageUrl:
      "https://images.pexels.com/photos/3076898/pexels-photo-3076898.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "8",
    name: "Pothos Dorado XL",
    price: 22000,
    description: "Colgante, de crecimiento rápido y muy noble.",
    imageUrl:
      "https://images.pexels.com/photos/4392276/pexels-photo-4392276.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const createProduct = (data) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    const newProduct = { ...data, id };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, data) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id) =>
    products.find((p) => String(p.id) === String(id)); // 👈 importantísimo

  return (
    <ProductsContext.Provider
      value={{ products, createProduct, updateProduct, deleteProduct, getProductById }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
