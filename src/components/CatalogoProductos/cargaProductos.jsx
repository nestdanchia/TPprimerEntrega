import { URL_API } from "./constans";

// Imagenes por categoria (Pexels, sin API key).
// Si la categoria no esta en el diccionario se usa el array fallback.
const imagenesTecnologia = {
  computacion:    ["https://images.pexels.com/photos/18105/pexels-photo.jpg", "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg"],
  accesorios:     ["https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg", "https://images.pexels.com/photos/5082566/pexels-photo-5082566.jpeg"],
  redes:          ["https://images.pexels.com/photos/4218546/pexels-photo-4218546.jpeg"],
  audio:          ["https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"],
  gaming:         ["https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg"],
  moviles:        ["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"],
  almacenamiento: ["https://images.pexels.com/photos/117729/pexels-photo-117729.jpeg"],
  componentes:    ["https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg"],
  muebles:        ["https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg"],
  streaming:      ["https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg"],
  fotografia:     ["https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg"],
  drones:         ["https://images.pexels.com/photos/336232/pexels-photo-336232.jpeg"],
  wearables:      ["https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg"],
  video:          ["https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg"],
  seguridad:      ["https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg"],
};

const fallback = ["https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"];

// Asigna una imagen a cada producto segun su categoria.
// Usa el indice para rotar entre las imagenes disponibles sin repetir seguido.
function asignarImagenes(data) {
  return data.map((p, i) => {
    const categoria = p.categoria?.toLowerCase().trim();
    const lista = imagenesTecnologia[categoria] || fallback;
    return { ...p, imagen: lista[i % lista.length] };
  });
}

// Intenta cargar desde MockAPI. Si falla, carga desde el JSON local.
// En ambos casos asigna imagenes antes de devolver los datos.
// El componente que llama no sabe de donde vinieron los datos.
export async function obtenerProductos() {

  try {
    const response = await fetch(URL_API);

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    const data = await response.json();

    if (!Array.isArray(data)) throw new Error("Formato de datos incorrecto");

    return asignarImagenes(data);

  } catch (errMock) {
    console.warn("MockAPI fallo, cargando JSON local...", errMock.message);

    try {
      const localResponse = await fetch("/data/productos.json");

      if (!localResponse.ok) throw new Error("No se pudo cargar el JSON local");

      const localData = await localResponse.json();

      if (!Array.isArray(localData)) throw new Error("JSON local con formato incorrecto");

      // En modo offline se usan imagenes locales porque Pexels tambien requiere internet.
      return localData.map((p, i) => ({ ...p, imagen: `/carrito${(i % 15) + 1}.png` }));

    } catch (errLocal) {
      throw new Error("No se pudieron cargar los productos desde ninguna fuente.");
    }
  }
}

export default obtenerProductos;
