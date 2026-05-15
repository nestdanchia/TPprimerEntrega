Todo listo. Acá el resumen de qué se cambió y qué tenés que hacer vos:

Cambios en el código
server.js — la API key ya no está hardcodeada, se lee con process.env.OPENROUTER_API_KEY. El HTTP-Referer también se lee de process.env.CLIENT_URL.

ChatIA.jsx — la URL del backend ya no es http://localhost:3001 fija, se lee de import.meta.env.VITE_API_URL. Si la variable no existe, cae a localhost:3001 como fallback para desarrollo local.

.env — ahora tiene las tres variables necesarias para desarrollo local. Este archivo NO se sube al repo (ya está en .gitignore).

.gitignore — agregado .env y .env.* para que nunca se suban accidentalmente.

Qué tenés que hacer vos
Para subir al nuevo repo de GitHub:

Crear el repo nuevo, subir el proyecto
Confirmar que .env y node_modules no aparecen en el commit (el .gitignore ya los excluye)
Para Vercel (frontend):

En el dashboard → tu proyecto → Settings → Environment Variables, agregar:
VITE_API_URL = https://tu-app.onrender.com (la URL que te da Render cuando desplegás el backend)
Para Render (backend):

Render es un servicio de hosting para Node/Express, similar a Vercel pero para servidores
Creás una cuenta en render.com, conectás el mismo repo de GitHub
Le decís que el archivo de entrada es server.js y el comando de inicio es node server.js
En el dashboard de Render → Environment → agregás estas variables:
OPENROUTER_API_KEY = sk-or-v1-... (tu clave real)
CLIENT_URL = https://tu-app.vercel.app (la URL que te da Vercel)
Render te da una URL pública tipo https://mi-proyecto.onrender.com — esa es la que ponés en Vercel como VITE_API_URL
El orden es: primero desplegás en Render → copiás la URL → la ponés en Vercel como variable de entorno → desplegás en Verce







# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
