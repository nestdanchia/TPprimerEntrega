import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { CatalogoProductos } from "./components/CatalogoProductos/CatalogoProductos";
import { ChatIA } from "./components/ChatIA/ChatIA";
import { AltaProducto } from "./components/AltaProducto/alta";
import ProductoDetalle from "./components/ProductoDetalle/ProductoDetalle";
import { CartProvider } from "./context/CartProvider";
import { Carrito } from "./components/Carrito/Carrito";

// CartProvider envuelve toda la app para que cualquier componente
// pueda acceder al estado del carrito via useContext(CartContext).
function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/"
            element={
              <CatalogoProductos mensaje="Tienda Virtual - Productos Disponibles" />
            }
          />
          <Route path="/chat" element={<ChatIA />} />
          <Route path="/alta" element={<AltaProducto />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
