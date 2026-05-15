import { useState } from "react";
import "./alta.css";
import { Link } from "react-router-dom";
import { URL_API } from "../CatalogoProductos/constans";
import FormularioProducto from "./FormularioProducto";

// ─── AltaProducto ─────────────────────────────────────────────────────────────
// Componente padre INTELIGENTE — maneja estado y comunicación con el mock.
//
// Responsabilidad: orquestar el alta de un producto nuevo.
//   - Mantiene el estado del formulario (datosForm)
//   - Procesa los cambios de cada campo (manejarCambio)
//   - Envía el POST a MockAPI y resetea el form al terminar (manejarEnvio)
//   - Delega el render al hijo FormularioProducto via props
//
// El hijo (FormularioProducto) solo recibe datos y funciones.
// Toda la lógica vive acá.
export function AltaProducto() {

  // Estado inicial del formulario — una propiedad por cada campo
  const [datosForm, setDatosForm] = useState({
    nombre:    "",
    stock:     "",
    precio:    "",
    categoria: "",
  });

  // ── manejarCambio ──────────────────────────────────────────────────────────
  // Una sola función para todos los campos.
  // evento.target.name → qué campo cambió (coincide con el atributo name del input)
  // evento.target.value → el nuevo valor que escribió el usuario
  // [name]: value → computed property: usa el valor de la variable como nombre de clave
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      // stock y precio se guardan como Number, no como string,
      // porque MockAPI los espera numéricos
      [name]: name === "stock" || name === "precio" ? Number(value) : value,
    });
  };

  // ── manejarEnvio ──────────────────────────────────────────────────────────
  // evento.preventDefault() evita que el formulario recargue la página
  // (comportamiento por defecto del navegador al hacer submit).
  // Luego hace POST al mock con los datos del formulario en formato JSON.
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosForm),
      });

      // Si el servidor responde con error HTTP, lo lanzamos manualmente
      // porque fetch no lanza error automáticamente en 4xx/5xx
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Producto agregado:", data);

      // Reset del formulario después del envío exitoso
      setDatosForm({ nombre: "", stock: "", precio: "", categoria: "" });
      alert(" Producto agregado correctamente");

    } catch (error) {
      console.error(" Error al agregar producto:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="pagina">
      <Link to="/" className="volverLink">
        ← Volver al catálogo
      </Link>

      {/*
        Pasamos al hijo:
          - datosForm  → los valores actuales de cada campo (flujo de bajada)
          - manejarCambio → callback para cuando el usuario escribe (flujo de subida)
          - manejarEnvio  → callback para cuando el usuario hace submit (flujo de subida)
      */}
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
      />
    </div>
  );
}

export default AltaProducto;
