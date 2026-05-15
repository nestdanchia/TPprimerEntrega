export const URL_API =
  "https://6a025e4b0d92f63dd2539b82.mockapi.io/api/v1/productos";

// ─── Diccionario de términos de búsqueda por categoría ───────────────────────


// ─── Diccionario de términos de búsqueda por categoría ───────────────────────
// El mock guarda cada producto con un campo "categoria" en español.
// LoremFlickr busca fotos en Flickr por palabra clave en inglés,
// así que necesitamos traducir la categoría antes de armar la URL.
//
// ¿Cómo funciona LoremFlickr?
//   https://loremflickr.com/300/200/{termino}?lock={numero}
//
//   300/200  → ancho x alto de la imagen en píxeles
//   termino  → palabra clave en inglés. Flickr busca fotos reales con esa etiqueta.
//              Si el término tiene muchas fotos (ej: "laptop") el lock funciona bien.
//              Si tiene pocas fotos (ej: "gaming-gpu-rtx-3090") puede devolver
//              siempre la misma imagen de fallback ignorando el lock.
//   lock     → número entero que "ancla" una foto específica del pool de resultados.
//              El mismo lock + mismo término = siempre la misma foto.
//              Locks distintos = fotos distintas del mismo pool.
//              Por eso usamos el índice del array (i) como lock: es único
//              para cada producto sin importar cuántos compartan categoría.



/*
cartContext.js ---crea el contexto ; CartProvider.jsx ---provee el contexto
useContext(CartContext) consume al contexto
  useContext(CartContext) === { agregarAlCarrito, quitarDelCarrito, vaciarCarrito, getTotal }


https:// 6a025e4b0d92f63dd2539b82 .mockapi.io /api/v1 / :endpoint
Nuevo recurso   https://6a025e4b0d92f63dd2539b82.mockapi.io/api/v1/productos  */

// ─── URL del mock en internet ────────────────────────────────────────────────
// En lugar de leer un archivo local (/data/productos.json), pedimos los datos
// a MockAPI, un servicio gratuito en internet que simula una base de datos REST.
//
// ¿Por qué MockAPI y no un archivo local?
// GitHub Pages es hosting estático: solo sirve HTML, CSS y JS.
// No tiene servidor Node, así que no puede responder rutas dinámicas.
// MockAPI vive en sus propios servidores y responde desde cualquier lugar.
//
// ¿Qué es REST?
// Es una convención para comunicarse con servidores via HTTP.
// GET  /productos     → traer todos
// POST /productos     → crear uno nuevo
// PUT  /productos/5   → modificar el de id=5
// DELETE /productos/5 → borrar el de id=5
// Nosotros solo usamos GET por ahora.


