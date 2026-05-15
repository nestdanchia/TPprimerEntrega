import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
/*
─── Carrito ──────────────────────────────────────────────────────────────────
 Responsabilidad: mostrar los productos que el usuario agregó al carrito
 y calcular el total de la compra.

─ Cómo se comunica con CatalogoProductos/CatalogoProductos.jsx ─────────────

 Estos dos componentes NUNCA se hablan directamente entre sí.
 Están en rutas distintas: "/" y "/carrito".
 Cuando uno está montado en pantalla, el otro no existe.

La comunicación ocurre a través del CartContext caja donde se guardara
la creamos con  const CartContext = createContext(); (patrón Publisher/Subscriber):

   CatalogoProductos  →  escribe en el contexto via agregarAlCarrito()
  Carrito            →  lee del contexto via carrito[]
//                      →  vacía el contexto via vaciarCarrito()
//
// El intermediario es CartProvider (en App.jsx), que vive por encima de ambas
// rutas y mantiene el estado vivo aunque el usuario navegue entre páginas.
//
// Flujo completo cuando el usuario hace clic en "Comprar":
//
//   1. Item.jsx llama onCompra(cantidad)
//      └─ esa función viene de CatalogoProductos via prop
//
//   2. CatalogoProductos ejecuta agregarAlCarrito(producto, cantidad)
//      └─ agregarAlCarrito viene de useContext(CartContext)
//      └─ CartProvider actualiza su estado interno: carrito[]
//
//   3. El usuario navega a /carrito → Carrito se monta
//      └─ useContext(CartContext) lee el mismo carrito[] que CartProvider tiene
//      └─ React re-renderiza Carrito con los datos actualizados
//
// Ninguno de los dos sabe que el otro existe.
// Solo saben que existe el contexto.
*/
export function Carrito() {

  // useContext(CartContext) conecta este componente al canal global.
  // Leemos carrito[] para mostrar los items.
  // vaciarCarrito() para resetear el estado cuando el usuario finaliza.
  // agregarAlCarrito existe en el contexto pero no lo necesitamos acá.
  const { carrito, vaciarCarrito } = useContext(CartContext);

  // useNavigate devuelve una función que permite navegar a otra ruta
  // de forma programática (sin que el usuario haga clic en un <Link>).
  // navigate("/")  → va al inicio (ruta raíz = CatalogoProductos)
  // navigate(-1)   → volvería a la página anterior del historial (NO es lo que usamos acá)
  const navigate = useNavigate();

  // Calculamos el total sumando precio × cantidad de cada item.
  // reduce() recorre el array acumulando el resultado:
  //   acc  = acumulador, empieza en 0
  //   item = cada producto del carrito
  // Si el carrito está vacío, reduce devuelve 0 directamente.
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // ── continuarComprando ─────────────────────────────────────────────────────
  // Vuelve al catálogo SIN tocar el carrito.
  // El estado se preserva: cuando el usuario vuelva a /carrito
  // verá los mismos productos y el mismo total.
  const continuarComprando = () => {
    navigate("/");
  };

  // ── finalizarCompra ────────────────────────────────────────────────────────
  // Vacía el carrito en el contexto (setCarrito([])) y vuelve al catálogo.
  // Cuando el usuario vuelva a /carrito verá el carrito vacío.
  //
  // En la segunda entrega, antes de vaciar, se implementará:
  //   - PUT/PATCH a MockAPI para descontar el stock real de cada producto
  const finalizarCompra = () => {
    alert(
      " La actualización de stock en el servidor se implementará en la segunda entrega del Práctico.\n\nTe redirigimos al catálogo."
    );
    vaciarCarrito();
    navigate("/");
  };

  return (
    <div>
      <h2>Mi carrito</h2>

      {/* Si el carrito está vacío mostramos un mensaje en lugar de la lista */}
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {/* carrito[] viene del contexto — lo mismo que llenó CatalogoProductos */}
          {carrito.map((item) => (
            <div key={item.id}>
              <p>{item.nombre}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio: ${item.precio}</p>
            </div>
          ))}

          <h3>Total: ${total}</h3>
        </>
      )}

      {/*
        Dos botones sin estilo — usan el default del navegador.
        En la segunda entrega se estilan en Carrito.module.css.

        Continuar comprando → preserva el carrito, vuelve al catálogo
        Finalizar compra    → vacía el carrito, vuelve al catálogo
      */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={continuarComprando} style={{ backgroundColor: "#1976d2", color: "#fff" }}>Continuar comprando</button>
        <button onClick={finalizarCompra} style={{ backgroundColor: "#4caf50", color: "#fff" }}>Finalizar compra</button>
      </div>
    </div>
  );
}

export default Carrito;
