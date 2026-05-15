/*import { Layout } from "./components/Layout/Layout";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { ChatIA } from "./components/ChatIA/ChatIA";
import { FormularioContainer } from "../practica";
function App() {
  return (
    <Layout>
      <ItemListContainer mensaje="🏪 Tienda Virtual - 53 Productos Disponibles" />
      <ChatIA />
      <FormularioContainer />
    </Layout>
  );
}

export default App;
*/
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { CatalogoProductos } from "./components/CatalogoProductos/CatalogoProductos";
import { ChatIA } from "./components/ChatIA/ChatIA";
import { AltaProducto } from "./components/AltaProducto/alta";
import ProductoDetalle from "./components/ProductoDetalle/ProductoDetalle";
import { CartProvider } from "./context/CartProvider";
import { Carrito } from "./components/Carrito/Carrito";
/*
Al envolver con <CartProvider>, el componente
 CartContext.Provider 
se encarga de inyectar el objeto definido
 como valor: en el hook useCart()
 para que pueda ser consumido por cualquier componente
que se encuentre dentro del árbol de componentes que estén
envueltos por ese provider. Eso significa que el valor que coloques
 en la propiedad value del provider, será accesible desde 
 cualquier componente 
en la propiedad value   en un canal de datos interno de React.
*/
function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/"
            element={
              <CatalogoProductos mensaje="🏪 Tienda Virtual - Productos Disponibles" />
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