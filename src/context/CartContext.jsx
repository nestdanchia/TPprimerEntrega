import { createContext } from "react";



export const CartContext = createContext();
/*
No usare el custom hook porque al inicio me parece mejor para aprender usar el Hook teorico...
creamos el contexto sin estado ni logica
de carrito de compras.
Cuando llamemos a este contexto, tendremos acceso 
al canal de comunicación

entre componentes que estén "conectados" a él.
entonces createContext() crea el "canal" de comunicación global.



CartContext = la tubería

Todavía NO tiene datos.
Solo crea el contexto para que luego el Provider
pueda compartir información.
*/