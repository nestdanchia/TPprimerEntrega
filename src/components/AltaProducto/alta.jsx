import { useState } from "react";
import "./alta.css";
import { Link } from "react-router-dom";
import { URL_API } from "../CatalogoProductos/constans";
import FormularioProducto from "./FormularioProducto";

// Componente padre que maneja el estado y la logica del alta de productos.
// Delega el render al hijo FormularioProducto via props.
export function AltaProducto() {

  const [datosForm, setDatosForm] = useState({
    nombre:    "",
    stock:     "",
    precio:    "",
    categoria: "",
  });

  // Una sola funcion para todos los campos.
  // Usa evento.target.name para saber que propiedad actualizar.
  // stock y precio se convierten a Number porque MockAPI los espera numericos.
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosForm({
      ...datosForm,
      [name]: name === "stock" || name === "precio" ? Number(value) : value,
    });
  };

  // Envia el formulario via POST a MockAPI y resetea el estado al terminar.
  // fetch no lanza error en 4xx/5xx, por eso verificamos response.ok manualmente.
  const manejarEnvio = async (evento) => {
    evento.preventDefault();

    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosForm),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      console.log("Producto agregado:", data);

      setDatosForm({ nombre: "", stock: "", precio: "", categoria: "" });
      alert("Producto agregado correctamente");

    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="pagina">
      <Link to="/" className="volverLink">
        Volver al catalogo
      </Link>

      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
      />
    </div>
  );
}

export default AltaProducto;
