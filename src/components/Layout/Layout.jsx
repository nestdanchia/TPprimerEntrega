import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

/*
export function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
*/