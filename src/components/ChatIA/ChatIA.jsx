import { useState } from "react";
import styles from "./ChatIA.module.css";
import { Link } from "react-router-dom";

export const ChatIA = () => {
  const [mensaje, setMensaje] = useState("");
  const [chat, setChat] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // true cuando el fetch falla por servidor apagado
  const [servidorOff, setServidorOff] = useState(false);

  const detectarIntencion = (texto) => {
    const t = texto.toLowerCase();
    return (
      t.includes("comprar") ||
      t.includes("precio") ||
      t.includes("cuanto") ||
      t.includes("cuánto") ||
      t.includes("quiero") ||
      t.includes("interesa")
    );
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const textoUsuario = mensaje.toLowerCase();
    const respuestasVacias = ["si", "sí", "ok", "dale", "bueno"];

    if (respuestasVacias.includes(textoUsuario)) {
      setChat((prev) => [
        ...prev,
        { tipo: "usuario", texto: mensaje },
        { tipo: "ia", texto: "¿Para qué la vas a usar? (trabajo, estudio, gaming o diseño)" },
      ]);
      setMensaje("");
      return;
    }

    setChat((prev) => [...prev, { tipo: "usuario", texto: mensaje }]);

    if (detectarIntencion(mensaje)) {
      setMostrarFormulario(true);
      setChat((prev) => [
        ...prev,
        { tipo: "ia", texto: "Perfecto, dejame tus datos y te contactamos." },
      ]);
      setMensaje("");
      return;
    }

    setCargando(true);

    const instrucciones = `Eres vendedor de Laptop Store.

Si el usuario responde sin contexto (ej: "sí", "ok"):
→ pedir aclaración específica

Nunca asumir intención.
Nunca responder genérico.

Catálogo disponible:
- HP 250 G8 – Intel i5, 8GB RAM, 256GB SSD – Oficina – $800
- Lenovo IdeaPad 3 – Ryzen 5, 16GB RAM, 512GB SSD – Uso general – $950
- ASUS TUF Gaming – Ryzen 7, 16GB RAM, RTX 3050 – Gaming – $1400

Reglas:
1. Recomendar 1 o 2 modelos.
2. Explicar por qué.
3. Máximo 2 párrafos.
`;

    try {
    // En local apunta a localhost:3001.
      // En producción (Vercel) apunta al backend desplegado en Render.
      // La variable VITE_API_URL se define en:
      //   - local: archivo .env  →  VITE_API_URL=http://localhost:3001
      //   - Vercel: dashboard → Environment Variables → VITE_API_URL=https://tu-app.onrender.com
      const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

      const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: instrucciones + "\nUsuario: " + mensaje }),
      });

      const data = await response.json();
      let texto = data.texto || "No se obtuvo respuesta";

      if (
        texto.toLowerCase().includes("nombre") ||
        texto.toLowerCase().includes("teléfono")
      ) {
        setMostrarFormulario(true);
      }

      setChat((prev) => [...prev, { tipo: "ia", texto }]);
      setMensaje("");
    } catch (err) {
      // ERR_CONNECTION_REFUSED = el servidor local no está corriendo
      if (err.message && err.message.includes("Failed to fetch")) {
        setServidorOff(true);
      }
      setChat((prev) => [
        ...prev,
        { tipo: "ia", texto: "Error al conectar con el servidor" },
      ]);
    }

    setCargando(false);
  };

  const enviarDatos = () => {
    if (!nombre || !telefono) {
      alert("Completa nombre y teléfono");
      return;
    }

    setChat((prev) => [
      ...prev,
      { tipo: "ia", texto: `Gracias ${nombre}. Te contactaremos al ${telefono}.` },
    ]);

    setNombre("");
    setTelefono("");
    setMostrarFormulario(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <h4 className={styles.title}>Asistente Virtual</h4>

        <Link to="/" className={styles.volverLink}>
           Volver al Catalogo
        </Link>
      </div>
      {/* Banner de aviso cuando el servidor local no está corriendo */}
      {servidorOff && (
        <div className={styles.servidorOff}>
           El servidor de IA no está activo. Ejecutá en la terminal:
          <code> npm run server</code>
        </div>
      )}

      <div className={styles.chatBox}>        {chat.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.tipo === "usuario" ? styles.messageUser : styles.messageIA}`}
          >
            <span
              className={`${styles.bubble} ${msg.tipo === "usuario" ? styles.bubbleUser : styles.bubbleIA}`}
            >
              {msg.texto}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={manejarEnvio} className={styles.form}>
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Hazme una pregunta..."
          className={styles.input}
        />
        <button type="submit" disabled={cargando} className={styles.sendButton}>
          {cargando ? "..." : "Enviar"}
        </button>
      </form>

      {!mostrarFormulario && (
        <button
          onClick={() => setMostrarFormulario(true)}
          className={styles.contactButton}
        >
          Quiero que me contacten
        </button>
      )}

      {mostrarFormulario && (
        <div className={styles.formContact}>
          <h5>Dejar datos para compra</h5>
          <div className={styles.formContactFields}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={styles.input}
            />
            <button onClick={enviarDatos} className={styles.sendButton}>
              Enviar datos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
