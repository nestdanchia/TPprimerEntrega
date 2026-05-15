import { URL_API } from "./constans";

// ─── Diccionario: categoría en español → término en inglés ───────────────────
// El mock guarda la categoría en español ("computacion", "gaming"...).
// imagenesTecnologia usa esas mismas claves en español, así que el diccionario
// actúa como traductor intermedio para cuando queramos cambiar a otro servicio
// de imágenes que requiera términos en inglés (ej: LoremFlickr).
const _diccionarioImagen = {
  computacion:    "laptop",
  accesorios:     "keyboard",
  audio:          "headphones",
  moviles:        "smartphone",
  almacenamiento: "harddrive",
  componentes:    "gpu",
  redes:          "router",
  muebles:        "chair",
  gaming:         "console",
  streaming:      "microphone",
  fotografia:     "camera",
  drones:         "drone",
  wearables:      "smartwatch",
  video:          "projector",
  seguridad:      "security",
};

// ─── Pool de imágenes por categoría (Pexels, no requiere API key) ─────────────
// Cada clave coincide con las categorías del mock (español).
// Si la categoría no está en el diccionario, se usa el array fallback.
// El índice (i % lista.length) distribuye las imágenes sin repetir seguido.
const imagenesTecnologia = {
  computacion: [
    "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
  ],
  accesorios: [
    "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
    "https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg",
  ],
  redes: [
    "https://images.pexels.com/photos/4218546/pexels-photo-4218546.jpeg",
  ],
  audio: [
    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
  ],
  gaming: [
    "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
  ],
  moviles: [
    "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
  ],
  almacenamiento: [
    "https://images.pexels.com/photos/117729/pexels-photo-117729.jpeg",
  ],
  componentes: [
    "https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg",
  ],
  muebles: [
    "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg",
  ],
  streaming: [
    "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
  ],
  fotografia: [
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
  ],
  drones: [
    "https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg",
  ],
  wearables: [
    "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
  ],
  video: [
    "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg",
  ],
  seguridad: [
    "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg",
  ],
};

// Imagen de fallback cuando la categoría no está en el diccionario
const fallback = [
  "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
];

// ─── Función que asigna imagen a cada producto ────────────────────────────────
// Recibe el array de datos crudos del mock o del JSON local.
// Usa diccionarioImagen para normalizar la categoría (por si en el futuro
// necesitamos el término en inglés) 
function asignarImagenes(data) {
  return data.map((p, i) => {
    const categoria = p.categoria?.toLowerCase().trim();

    // _diccionarioImagen traduce la categoría al término en inglés.
    // Por ahora imagenesTecnologia usa claves en español, así que
    // usamos la categoría directamente
    const _terminoIngles = _diccionarioImagen[categoria]; // disponible para uso futuro

    const lista = imagenesTecnologia[categoria] || fallback;

    return {
      ...p,
      imagen: lista[i % lista.length],
    };
  });
}

// ─── Servicio principal ───────────────────────────────────────────────────────
// Intenta cargar desde MockAPI. Si falla (sin internet, 404, etc.),
// cae al catch y carga desde el JSON local en /public/data/productos.json.
// En ambos casos asigna imágenes antes de devolver los datos.
// El componente que llama a esta función no sabe de dónde vinieron los datos.
export async function obtenerProductos() {

  // ── Intento 1: MockAPI 
  try {
    const response = await fetch(URL_API);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("El formato de datos no es correcto");
    }

    console.log(`✅ ${data.length} productos cargados desde MockAPI`);
    return asignarImagenes(data);

  } catch (errMock) {
    console.warn("⚠ MockAPI falló, intentando JSON local...", errMock.message);

    // ── Intento 2: JSON local ─────────────────────────────────────────────────
    // Si no hay internet o MockAPI no responde, cargamos el respaldo local.
    // Las imágenes locales (carrito1.png ... carrito15.png) se usan como
    // fallback porque Pexels también requiere internet.
    try {
      const localResponse = await fetch("/data/productos.json");

      if (!localResponse.ok) {
        throw new Error("No se pudo cargar el JSON local");
      }

      const localData = await localResponse.json();

      if (!Array.isArray(localData)) {
        throw new Error("El JSON local no tiene formato correcto");
      }

      // En modo offline usamos imágenes locales (.png en /public)
      // porque Pexels también requiere internet.
      const productosLocales = localData.map((p, i) => ({
        ...p,
        imagen: `/carrito${(i % 15) + 1}.png`,
      }));

      console.log(`✅ ${productosLocales.length} productos cargados desde JSON local (modo offline)`);
      return productosLocales;

    } catch (errLocal) {
      // Ambas fuentes fallaron — lanzamos el error para que el componente
      // lo capture y muestre el estado de error al usuario.
      console.error(" También falló el JSON local:", errLocal.message);
      throw new Error("No se pudieron cargar los productos desde ninguna fuente.");
    }
  }
}

export default obtenerProductos;
