import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { Item } from "../Item/Item";
import styles from "./CatalogoProductos.module.css";
import { CartContext } from "../../context/CartContext";
import { obtenerProductos } from "./cargaProductos";

// ─── CatalogoProductos ────────────────────────────────────────────────────────
// Orquestador de la tienda. Carga el catálogo y renderiza la grilla de productos.
// Delega la carga de datos al servicio cargaProductos — no sabe de fetch ni URLs.
//
// Responsabilidades:
//   - Estado: productos, loading, error, historial
//   - Llamar al servicio obtenerProductos() via useEffect
//   - Manejar el callback de compra (descuenta stock + agrega al carrito global)
//   - Render condicional: spinner → error → grilla de productos
//
// ── Cómo se comunica con Carrito/Carrito.jsx ─────────────────────────────────
//
// Estos dos componentes NUNCA se hablan directamente entre sí.
// Están en rutas distintas: "/" y "/carrito".
// Cuando uno está montado en pantalla, el otro no existe.
//
// La comunicación ocurre a través del CartContext (patrón Publisher/Subscriber):
//
//   CatalogoProductos  →  escribe en el contexto via agregarAlCarrito()
//   Carrito            →  lee del contexto via carrito[]
//
// El intermediario es CartProvider (en App.jsx), que vive por encima de ambas
// rutas y mantiene el estado vivo aunque el usuario navegue entre páginas.
//
// Flujo completo cuando el usuario hace clic en "Comprar":
//
//   1. Item.jsx llama onCompra(cantidad)
//      └─ esa función viene de este componente via prop
//
//   2. crearCallbackCompra() ejecuta agregarAlCarrito(producto, cantidad)
//      └─ agregarAlCarrito viene de useContext(CartContext)  ← acá abajo
//      └─ CartProvider actualiza su estado interno: carrito[]
//
//   3. El usuario navega a /carrito → Carrito se monta
//      └─ Carrito hace useContext(CartContext) y lee el mismo carrito[]
//      └─ React renderiza Carrito con los datos que este componente escribió
//
// Ninguno de los dos sabe que el otro existe.
// Solo saben que existe el contexto.
export function CatalogoProductos({ mensaje }) {
  const [productos, setProductos]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [historial, _setHistorial]    = useState([]);

  // Nos conectamos al canal global del carrito.
  // Solo necesitamos agregarAlCarrito() — la función que escribe en el contexto.
  // carrito[] existe en el contexto pero no lo leemos acá:
  // este componente solo agrega, nunca muestra el carrito.
  const { agregarAlCarrito } = useContext(CartContext);

  // ── useEffect: carga inicial ────────────────────────────────────────────────
  // Se ejecuta una sola vez al montar el componente (array [] vacío).
  // Llama al servicio que decide si cargar desde MockAPI o desde el JSON local.
  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);

        // obtenerProductos() maneja internamente:
        //   1. Intento con MockAPI
        //   2. Fallback al JSON local si MockAPI falla
        //   3. Asignación de imágenes en ambos casos
        // Si ambas fuentes fallan, lanza un error que capturamos acá.
        const productosCargados = await obtenerProductos();
        setProductos(productosCargados);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // ── Callback de compra ──────────────────────────────────────────────────────
  // Patrón closure: crearCallbackCompra(id) devuelve una función personalizada
  // para ese producto. El hijo (Item) la recibe como prop onCompra y la llama
  // con la cantidad cuando el usuario hace clic en "Comprar".
  //
  // Hace dos cosas:
  //   1. Agrega el producto al carrito global (CartContext)
  //   2. Descuenta el stock en el estado local para actualizar la UI
  const crearCallbackCompra = (productoId) => {
    return (cantidad) => {
      const productoComprado = productos.find((p) => p.id === productoId);

      if (productoComprado) {
        agregarAlCarrito(productoComprado, cantidad);
      }

      // Forma funcional: React inyecta el estado más reciente como argumento
      setProductos((productosActuales) =>
        productosActuales.map((p) =>
          p.id === productoId ? { ...p, stock: p.stock - cantidad } : p
        )
      );
    };
  };

  // ── Render condicional: spinner ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <h2>Cargando productos...</h2>
          <p>Por favor, espera un momento mientras cargamos el catálogo.</p>
        </div>
      </div>
    );
  }

  // ── Render condicional: error ───────────────────────────────────────────────
  // Solo llega acá si tanto MockAPI como el JSON local fallaron.
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Error al cargar los productos</h2>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorActions}>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              🔄 Reintentar
            </button>
            <button
              onClick={() => window.location.reload()}
              className={styles.reloadButton}
            >
              🔄 Recargar página
            </button>
          </div>
          <div className={styles.errorHelp}>
            <h3>Posibles soluciones:</h3>
            <ul>
              <li>Verificá tu conexión a internet</li>
              <li>Comprobá que la URL de MockAPI sea correcta</li>
              <li>Revisá la consola para más detalles del error</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ── Render principal ────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1>{mensaje || "🏪 Tienda Virtual"}</h1>

        <div className={styles.stats}>
          <span className={styles.stat}>📦 {productos.length} productos</span>
          <span className={styles.stat}>🛒 {historial.length} compras</span>
        </div>

        <div>
          <Link to="/carrito" className={styles.linkCarrito}>
            <h1 className={styles.textoEnlace}>
              <FiShoppingBag className={styles.iconoEnlace} /> Ver Compras realizadas
            </h1>
          </Link>
        </div>
      </header>

      {productos.length === 0 ? (
        <div className={styles.empty}>
          <h2>No hay productos disponibles</h2>
          <p>El catálogo está vacío en este momento.</p>
        </div>
      ) : (
        <main className={styles.catalogo}>
          <div className={styles.grid}>
            {productos.map((producto) => (
              <Item
                key={producto.id}
                id={producto.id}
                categoria={producto.categoria}
                nombre={producto.nombre}
                precio={producto.precio}
                stock={producto.stock}
                imagen={producto.imagen}
                onCompra={crearCallbackCompra(producto.id)}
              />
            ))}
          </div>
        </main>
      )}

      {historial.length > 0 && (
        <section className={styles.historial}>
          <h2>📋 Historial de Compras</h2>
          <div className={styles.historialList}>
            {historial.slice(0, 5).map((entrada) => (
              <div key={entrada.id} className={styles.historialItem}>
                <div className={styles.historialInfo}>
                  <strong>{entrada.producto}</strong>
                  <span>{entrada.cantidad} × ${entrada.precioUnitario}</span>
                </div>
                <div className={styles.historialTotal}>
                  <strong>${entrada.total}</strong>
                  <small>{entrada.timestamp}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

export default CatalogoProductos;
