import { useState } from "react";
import { CartContext } from "./CartContext";

// CartProvider administra el estado global del carrito y lo comparte
// con todos los componentes hijos via CartContext.Provider.
export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // Agrega un producto al carrito. Si ya existe, suma la cantidad.
  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);

      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...prev, { ...producto, cantidad }];
    });
  };

  // Resetea el carrito a vacio. Se llama al finalizar la compra.
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
}
