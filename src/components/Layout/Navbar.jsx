import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
     
      <Link to="/" className={styles.link}>Inicio</Link>
      <Link to="/chat" className={styles.link}>Chat IA </Link>
      <Link to="/alta" className={styles.link}>Alta Producto</Link>
      <Link to="/carrito" className={styles.link}>Ver carrito</Link>
   

   
    </nav>
  );
};

export default Navbar;
