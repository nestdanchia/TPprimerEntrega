import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

// Lee el carrito del contexto global y muestra los productos agregados.
// CatalogoProductos escribe en el contexto, Carrito lo lee.
// Ninguno sabe que el otro existe — CartProvider es el intermediario.
export function Carrito() {
  const { carrito, vaciarCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Vuelve al catalogo sin tocar el carrito.
  const continuarComprando = () => navigate("/");

  // Vacia el carrito y vuelve al catalogo.
  // En la segunda entrega se agregara PUT/PATCH a MockAPI para descontar stock real.
  const finalizarCompra = () => {
    alert("La actualizacion de stock en el servidor se implementara en la segunda entrega.\n\nTe redirigimos al catalogo.");
    vaciarCarrito();
    navigate("/");
  };

  return (
    <div>
      <h2>Mi carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito esta vacio.</p>
      ) : (
        <>
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

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={continuarComprando} style={{ backgroundColor: "#1976d2", color: "#fff" }}>
          Continuar comprando
        </button>
        <button onClick={finalizarCompra} style={{ backgroundColor: "#4caf50", color: "#fff" }}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}

export default Carrito;
