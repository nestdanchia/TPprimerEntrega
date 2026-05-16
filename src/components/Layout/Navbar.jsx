import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

// NavLink es igual a Link pero agrega la clase "active" automaticamente
// cuando la ruta actual coincide con el "to". Usamos la prop className
// como funcion para combinar el estilo base con el activo.
/**
 *  mantener el efecto visual (fondo naranja cuando está activo), 
 * entonces necesito getClass y .activ
 *  envía el objeto { isActive }?

NavLink lo envía automáticamente
Si la ruta actual coincide con el to, envía { isActive: true }
Si no coincide, envía { isActive: false }
mecanismo de React Router para poder aplicar estilos condicionales al link activo.
 */
const Navbar = () => {
  const getClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={getClass} end>Inicio</NavLink>
      <NavLink to="/chat" className={getClass}>Chat IA</NavLink>
      <NavLink to="/alta" className={getClass}>Alta Producto</NavLink>
      <NavLink to="/privada" className={getClass}>Área Privada</NavLink>
      <NavLink to="/carrito" className={getClass}>Ver carrito</NavLink>
    </nav>
  );
};

export default Navbar;
