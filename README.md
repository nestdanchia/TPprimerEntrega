# Mi Tienda React — TP Primer Entrega

## 🚀 Demo en vivo

| | URL |
|---|---|
|  Frontend | https://t-pprimer-entrega.vercel.app |
|  Backend | https://tpprimerentrega.onrender.com |
|  Repositorio | https://github.com/nestdanchia/TPprimerEntrega |

> **Para usar la aplicación solo hace falta abrir el Frontend en el navegador.** No se requiere instalación.

---

##  Funcionalidades

- **Catálogo de productos** — listado con imágenes, precios y stock
- **Ver detalle** — página individual de cada producto
- **Carrito de compras** — agregar, quitar y ver resumen de compra
- **CRUD de productos** — Alta, edición y eliminación de productos (requiere autenticación)
- **Autenticación** — Login para acceder al panel de administración
- **Chat con IA** — Asistente integrado para consultas sobre productos
- **Diseño responsivo** — Adaptado para desktop y mobile

---

## ⚠️ Nota sobre el backend

El backend está alojado en Render con el plan gratuito. Si no se usa por 15 minutos, **se duerme automáticamente**. La primera vez que se accede al chat con IA puede tardar hasta 60 segundos en responder mientras el servidor se reactiva. Esto es normal.

---

##  Tecnologías utilizadas

- **Frontend:** React 19, Vite, React Router, React Icons
- **Backend:** Node.js, Express
- **IA:** OpenRouter API (Google Generative AI)
- **Despliegue:** Vercel (frontend) + Render (backend)

---

##  Correr el proyecto localmente (solo para desarrollo)

> El profe no necesita hacer esto. La app ya está desplegada y funciona desde el navegador.

```bash
# Instalar dependencias
npm install

# Iniciar frontend
npm run dev

# Iniciar backend (en otra terminal)
npm run server
```

Para correrlo localmente se necesita un archivo `.env` con las variables de entorno (API keys). Estas no se suben al repositorio por seguridad.
