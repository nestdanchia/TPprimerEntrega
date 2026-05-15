import "./alta.css";

// ─── FormularioProducto ───────────────────────────────────────────────────────
// Componente hijo PRESENTACIONAL — solo renderiza el formulario.
//
// Responsabilidad única: mostrar los campos y avisar al padre cuando algo cambia.
// No sabe nada de fetch, estado global ni lógica de negocio.
//
// FLUJO DE BAJADA:  padre (AltaProducto) → hijo via props (datosForm)
// FLUJO DE SUBIDA:  hijo → padre via callbacks (manejarCambio, manejarEnvio)
function FormularioProducto({ datosForm, manejarCambio, manejarEnvio }) {
  return (
    <div className="card">
      <h3 className="titulo">Agregar Nuevo Producto</h3>

      <form onSubmit={manejarEnvio}>

        {/* ── Nombre ── */}
        <div className="campo">
          <label className="label">Nombre del Producto</label>
          {/*
            name="nombre" es la clave del patrón de formulario unificado:
            cuando el usuario escribe, onChange dispara manejarCambio,
            que usa evento.target.name para saber qué propiedad del estado actualizar.
            Así una sola función maneja todos los campos.
          */}
          <input
            className="input"
            type="text"
            name="nombre"
            placeholder="Ej: Teclado Mecánico"
            value={datosForm.nombre}
            onChange={manejarCambio}
          />
        </div>

        {/* ── Stock ── */}
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

        {/* ── Precio ── */}
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

        {/* ── Categoría ── */}
        <div className="campo">
          <label className="label">Categoría</label>
          {/*
            El select también usa name="categoria" y el mismo manejarCambio.
            evento.target.value devuelve el value de la option seleccionada.
          */}
          <select
            className="select"
            name="categoria"
            value={datosForm.categoria}
            onChange={manejarCambio}
          >
            <option value="">Seleccionar...</option>
            <option value="computacion">Computación</option>
            <option value="accesorios">Accesorios</option>
            <option value="audio">Audio</option>
            <option value="moviles">Móviles</option>
            <option value="almacenamiento">Almacenamiento</option>
            <option value="componentes">Componentes</option>
            <option value="redes">Redes</option>
            <option value="muebles">Muebles</option>
            <option value="gaming">Gaming</option>
            <option value="streaming">Streaming</option>
            <option value="fotografia">Fotografía</option>
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
