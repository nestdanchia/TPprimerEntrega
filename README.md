# Mi Tienda React - TP Primer Entrega

## Demo en vivo

| | URL |
|---|---|
| Frontend | https://t-pprimer-entrega.vercel.app |
| Backend | https://tpprimerentrega.onrender.com |
| Repositorio | https://github.com/nestdanchia/TPprimerEntrega |

Para usar la aplicacion solo hace falta abrir el Frontend en el navegador. No se requiere instalacion.

---

## Sistema de fallback

La aplicacion esta disenada para funcionar incluso sin conexion a internet completa o cuando los servicios externos no responden.

Carga de productos: el origen principal es MockAPI (base de datos REST en la nube). Si MockAPI no responde, la aplicacion carga automaticamente un archivo JSON local incluido en el proyecto (public/data/productos.json), sin mostrar ningun error al usuario.

Imagenes: cuando los productos vienen de MockAPI, las imagenes se cargan desde Pexels segun la categoria del producto. Si se activa el fallback al JSON local, las imagenes tambien son locales (archivos carrito1.png a carrito15.png incluidos en el proyecto). Ademas, si una imagen de Pexels falla individualmente al cargar, el componente Item la reemplaza en ese momento por una imagen local aleatoria de las mismas 15 disponibles.

En ningun caso la aplicacion queda sin productos ni sin imagenes.

---

## Funcionalidades

- Catalogo de productos — listado con imagenes, precios y stock
- Ver detalle — pagina individual de cada producto
- Carrito de compras — agregar, quitar y ver resumen de compra
- CRUD de productos — Alta, edicion y eliminacion de productos
- Chat con IA — Asistente integrado para consultas sobre productos
- Diseno responsivo — Adaptado para desktop y mobile

---

## Nota sobre el backend

El backend esta alojado en Render con el plan gratuito. Si no se usa por 15 minutos, se duerme automaticamente. La primera vez que se accede al chat con IA puede tardar hasta 60 segundos en responder mientras el servidor se reactiva. Esto es normal.

---

## Tecnologias utilizadas

- Frontend: React 19, Vite, React Router, React Icons
- Backend: Node.js, Express
- IA: OpenRouter API (Google Generative AI)
- Despliegue: Vercel (frontend) + Render (backend)

---

## Correr el proyecto localmente (solo para desarrollo)

El profe no necesita hacer esto. La app ya esta desplegada y funciona desde el navegador.

```bash
# Instalar dependencias
npm install

# Iniciar frontend
npm run dev

# Iniciar backend (en otra terminal)
npm run server
```

El backend requiere un archivo .env con la clave de la API de IA (OPENROUTER_API_KEY). El frontend no necesita ninguna configuracion adicional para correr localmente.
