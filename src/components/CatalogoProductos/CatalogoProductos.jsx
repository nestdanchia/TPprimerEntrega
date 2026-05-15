import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { Item } from "../Item/Item";
import styles from "./CatalogoProductos.module.css";
import { CartContext } from "../../context/CartContext";
import { obtenerProductos } from "./cargaProductos";

// Orquestador de la tienda. Carga el catalogo y renderiza la grilla de productos.
// Delega la carga de datos a cargaProductos — no sabe de fetch ni URLs.
//
// Comunicacion con Carrito: ambos componentes estan en rutas distintas y nunca
// se hablan directamente. CatalogoProductos escribe en CartContext via
// agregarAlCarrito(), Carrito lee del mismo contexto. CartProvider (en App.jsx)
// mantiene el estado vivo mientras el usuario navega entre paginas.
export function CatalogoProductos({ mensaje }) {
  const [productos, setProductos]  = useState([]);
  const [loading, setLoading]      = useState(true);
  const [error, setError]          = useState(null);
  const [historial, _setHistorial] = useState([]);

  const { agregarAlCarrito } = useContext(CartContext);

  // Carga inicial — se ejecuta una sola vez al montar el componente.
  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null);
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

  // Devuelve una funcion de compra especifica para cada producto.
  // Al ejecutarse: agrega al carrito global y descuenta el stock local.
  const crearCallbackCompra = (productoId) => {
    return (cantidad) => {
      const productoComprado = productos.find((p) => p.id === productoId);
      if (productoComprado) agregarAlCarrito(productoComprado, cantidad);

      setProductos((productosActuales) =>
        productosActuales.map((p) =>
          p.id === productoId ? { ...p, stock: p.stock - cantidad } : p
        )
      );
    };
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <h2>Cargando productos...</h2>
          <p>Por favor, espera un momento mientras cargamos el catalogo.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <div className={styles.errorIcon}>aviso</div>
          <h2>Error al cargar los productos</h2>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorActions}>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              Reintentar
            </button>
            <button onClick={() => window.location.reload()} className={styles.reloadButton}>
              Recargar pagina
            </button>
          </div>
          <div className={styles.errorHelp}>
            <h3>Posibles soluciones:</h3>
            <ul>
              <li>Verifica tu conexion a internet</li>
              <li>Comprueba que la URL de MockAPI sea correcta</li>
              <li>Revisa la consola para mas detalles del error</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1>{mensaje || "Tienda Virtual"}</h1>

        <div className={styles.stats}>
          <span className={styles.stat}>{productos.length} productos</span>
          <span className={styles.stat}>{historial.length} compras</span>
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
          <p>El catalogo esta vacio en este momento.</p>
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
          <h2>Historial de Compras</h2>
          <div className={styles.historialList}>
            {historial.slice(0, 5).map((entrada) => (
              <div key={entrada.id} className={styles.historialItem}>
                <div className={styles.historialInfo}>
                  <strong>{entrada.producto}</strong>
                  <span>{entrada.cantidad} x ${entrada.precioUnitario}</span>
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
