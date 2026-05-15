// ─────────────────────────────────────────────────────────────
// CartProvider.jsx
// PROVEEDOR GLOBAL DEL CARRITO
// ─────────────────────────────────────────────────────────────

//CartProvider.jsx
import { useState } from "react";
import { CartContext } from "./CartContext";
// habilitamos canal de comunicacion es el telefono
//const CartContext = createContext();




/*
CartProvider = componente que envuelve parte de la app
y comparte información con todos sus hijos.
componente que administra el estado real.

Ejemplo:

<CartProvider>
   <App />
</CartProvider>

Todo lo que esté dentro podrá acceder al carrito.
*/
export function CartProvider({ children }) {
  /*
  carrito = estado global del carrito

  Ejemplo:

  [
    {
      id: 1,
      nombre: "Teclado",
      precio: 80,
      cantidad: 2
    }
  ]
  */
 // fabricamos al carrito
  const [carrito, setCarrito] = useState([]);
//Este sí es el estado global compartido.
  /*
  agregarAlCarrito(producto, cantidad)

  Esta función:
  - recibe un producto
  - recibe cuántas unidades quiere el usuario
  - actualiza el carrito global
  */
  const agregarAlCarrito = (producto, cantidad) => {
    /*
    Usamos forma funcional porque depende
    del estado anterior del carrito.

    prev = estado REAL más reciente
    que React inyecta automáticamente
    */
    setCarrito((prev) => {
      /*
      Buscamos si ese producto ya existe
      dentro del carrito
      */
     console.log(" Carrito antes:", prev);
    console.log(" Producto recibido:", producto);
    console.log(" Cantidad recibida:", cantidad);
      console.log(" Buscando si existe...");
      const existe = prev.find(
        (item) => item.id === producto.id
      );

      /*
      Si ya existe:
      NO agregamos otro objeto nuevo

      Solo aumentamos la cantidad
      */
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
              }
            : item
        );
      }

      /*
      Si NO existe:
      agregamos un nuevo producto
      al array del carrito
      */
      return [
        ...prev,
        {
          ...producto,
          cantidad,
        },
      ];
    });
  };

  /*
  vaciarCarrito()

  Resetea el carrito a un array vacío.
  Se usa cuando el usuario hace clic en "Finalizar compra":
  la compra se da por cerrada y el carrito queda limpio
  para una nueva sesión de compras.

  En la segunda entrega, antes de vaciar,
  se hará PUT/PATCH a MockAPI para descontar el stock real.
  */
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  /*
  ESTA PARTE ES LA MÁS IMPORTANTE:

  <CartContext.Provider>

  significa:

  "voy a compartir estos valores
   con todos los componentes hijos"

  value={{
    carrito,
    agregarAlCarrito
  }}

  significa:

  todos los hijos podrán usar:

  - carrito
  - agregarAlCarrito()

  mediante:

  const { carrito, agregarAlCarrito }
    = useContext(CartContext)

  {children}

  significa:

  renderizá todo lo que esté dentro
  del CartProvider

  Ejemplo:

  <CartProvider>
     <App />
  </CartProvider>

  acá:

  children === <App />



  No defino por ejemplo como en la guia a getCartTotal en el Context 
  porque es mas simple en la estructura actual Calcular el 
  total directamente en Carrito.jsx y asi con otros calculos 
  */
  return (
    <CartContext.Provider
      value={{
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
  }}
    >
      {children}
    </CartContext.Provider>
  );
}