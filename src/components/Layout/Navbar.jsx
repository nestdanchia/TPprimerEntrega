import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

// NavLink es igual a Link pero agrega la clase "active" automaticamente
// cuando la ruta actual coincide con el "to". Usamos la prop className
// como funcion para combinar el estilo base con el activo.
const Navbar = () => {
  const getClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={getClass} end>Inicio</NavLink>
      <NavLink to="/chat" className={getClass}>Chat IA</NavLink>
      <NavLink to="/alta" className={getClass}>Alta Producto</NavLink>
      <NavLink to="/carrito" className={getClass}>Ver carrito</NavLink>
    </nav>
  );
};

export default Navbar;
