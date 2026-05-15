import "./alta.css";

// Componente hijo presentacional — solo renderiza el formulario.
// No tiene logica ni estado propio. Recibe datos y callbacks del padre.
// Flujo de bajada: padre -> hijo via datosForm.
// Flujo de subida: hijo -> padre via manejarCambio y manejarEnvio.
function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {
  return (
    <div className="card">
      <h3 className="titulo">Agregar Nuevo Producto</h3>

      <form onSubmit={manejarEnvio}>

        <div className="campo">
          <label className="label">Nombre del Producto</label>
          <input
            className="input"
            type="text"
            name="nombre"
            placeholder="Ej: Teclado Mecanico"
            value={datosForm.nombre}
            onChange={manejarCambio}
          />
        </div>

        <div className="campo">
          <label className="label">Stock</label>
          <input
            className="input"
            type="number"
            name="stock"
            placeholder="Ej: 10"
            value={datosForm.stock}
            onChange={manejarCambio}
          />
        </div>

        <div className="campo">
          <label className="label">Precio ($)</label>
          <input
            className="input"
            type="number"
            name="precio"
            placeholder="Ej: 95"
            value={datosForm.precio}
            onChange={manejarCambio}
          />
        </div>

        <div className="campo">
          <label className="label">Categoria</label>
          {/* El select usa el mismo manejarCambio que los inputs via name="categoria" */}
          <select
            className="select"
            name="categoria"
            value={datosForm.categoria}
            onChange={manejarCambio}
          >
            <option value="">Seleccionar...</option>
            <option value="computacion">Computacion</option>
            <option value="accesorios">Accesorios</option>
            <option value="audio">Audio</option>
            <option value="moviles">Moviles</option>
            <option value="almacenamiento">Almacenamiento</option>
            <option value="componentes">Componentes</option>
            <option value="redes">Redes</option>
            <option value="muebles">Muebles</option>
            <option value="gaming">Gaming</option>
            <option value="streaming">Streaming</option>
            <option value="fotografia">Fotografia</option>
            <option value="drones">Drones</option>
            <option value="wearables">Wearables</option>
            <option value="video">Video</option>
            <option value="seguridad">Seguridad</option>
          </select>
        </div>

        <button type="submit" className="boton">
          Guardar Producto
        </button>

      </form>
    </div>
  );
}

export default FormularioProducto;
