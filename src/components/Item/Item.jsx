import { useState } from "react";
import styles from "./Item.module.css";
import { Link } from "react-router-dom";
export function Item({ id,nombre, precio, stock, imagen, onCompra }) {
  const [cantidad, setCantidad] = useState(0);

  const sumar = () => {
    if (cantidad < stock) setCantidad((c) => c + 1);
  };

  const restar = () => {
    if (cantidad > 0) setCantidad((c) => c - 1);
  };

  const comprar = () => {
    if (cantidad === 0) return;
    onCompra(cantidad);
    setCantidad(0);
  };

  return (
    <article className={styles.card}>
      {id && <Link to={`/producto/${id}`}>Ver detalle</Link>}

      <img
        src={imagen}
        alt={nombre}
        className={styles.image}
        onError={(e) => {
           e.target.onerror = null;
          const imagenesRespaldo = [
            "/carrito1.png",
            "/carrito2.png",
            "/carrito3.png",
            "/carrito4.png",
            "/carrito5.png",
            "/carrito6.png",
            "/carrito7.png",
            "/carrito8.png",
            "/carrito9.png",
            "/carrito10.png",
            "/carrito11.png",
            "/carrito12.png",
            "/carrito13.png",
            "/carrito14.png",
            "/carrito15.png",
          ];

          // elige una imagen aleatoria
          const random =
            imagenesRespaldo[
              Math.floor(Math.random() * imagenesRespaldo.length)
            ];

          e.target.src = random;
        }}
      />

      <h3>{nombre}</h3>
      <p>${precio}</p>
      <p translate="no">Stock: {stock}</p>

      {stock <= 2 && <p className={styles.alerta}>⚠ Stock bajo - Reponer</p>}

      <div className={styles.quantityControl}>
        <button
          className={styles.quantityButton}
          onClick={restar}
          disabled={cantidad === 0}
        >
          -
        </button>
        <span className={styles.quantity}>{cantidad}</span>
        <button
          className={styles.quantityButton}
          onClick={sumar}
          disabled={cantidad >= stock}
        >
          +
        </button>
      </div>

      <button
        onClick={comprar}
        disabled={cantidad === 0}
        className={cantidad === 0 ? styles.buttonDisabled : styles.buttonActive}
      >
        Comprar
      </button>
    </article>
  );
}
