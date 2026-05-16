import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { CatalogoProductos } from "./components/CatalogoProductos/CatalogoProductos";
import { ChatIA } from "./components/ChatIA/ChatIA";
import { AltaProducto } from "./components/AltaProducto/alta";
import ProductoDetalle from "./components/ProductoDetalle/ProductoDetalle";
import { CartProvider } from "./context/CartProvider";
import { Carrito } from "./components/Carrito/Carrito";
import { RutaPrivadaElemental } from "./components/RutaPrivadaElementales";

// CartProvider comparte el estado global del carrito con todos los
// componentes hijos que consuman CartContext usando useContext().

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
          {/* Ruta protegida de ejemplo */}
          <Route
            path="/privada"
            element={
              <RutaPrivadaElemental>
                <div>
                  <h2>Área Privada</h2>
                  <p>Esta página está protegida y solo es accesible con autenticación.</p>
                </div>
              </RutaPrivadaElemental>
            }
          />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
