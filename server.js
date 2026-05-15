import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//  CLAVE DE API DE OPENROUTER — se lee desde variable de entorno.
// En local: crear un archivo .env en la raíz con:
//   OPENROUTER_API_KEY=sk-or-v1-...
// En Render: cargar esa misma variable en el dashboard (Environment → Add Variable).
// NUNCA hardcodear la clave acá ni subirla al repo.
const API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/chat", async (req, res) => {
  const { mensaje } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.CLIENT_URL || "http://localhost:5173",
          "X-Title": "Chat Laptop Store",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content:
                "Eres un vendedor experto de laptops. Responde claro, concreto y recomienda modelos según uso.",
            },
            {
              role: "user",
              content: mensaje,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    console.log("Respuesta OpenRouter:", data);

    const texto =
      data.choices?.[0]?.message?.content ||
      data.error?.message ||
      "Sin respuesta";

    // Enviamos el objeto con la propiedad 'texto' como pidió el usuario
    res.json({ texto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en servidor" });
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});

/* ---------------------------------------------------------
   CÓDIGO ANTERIOR (GOOGLE GEMINI) - COMENTADO no me funciono
   ---------------------------------------------------------
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando OK");
});

app.post("/chat", async (req, res) => {
  const { mensaje } = req.body;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite-001:generateContent?key=AIzaSyAg_qdGgw3Sh1Y5rIpaDAhvYf7_6NpRDN8",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: mensaje }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Respuesta de Google:", JSON.stringify(data, null, 2));
    res.json(data);

  } catch (error) {
    console.error("ERROR SERVER:", error);
    res.status(500).json({ error: "Error en servidor" });
  }
});

import { GoogleGenerativeAI } from "@google/generative-ai";

//  CLAVE DE API (AIzaSyA6...)
const genAI = new GoogleGenerativeAI("AIzaSyA6WTJ1Vxb7y1c0uzM0iVEYS5vA_hsUflI");


 * 🛠️ CONFIGURACIÓN DEL MODELO
 * Volvemos a la configuración v1beta directa.

export const model = genAI.getGenerativeModel(
  { model: "gemini-1.5-flash" },
  { apiVersion: "v1beta" }
);
VITE_GEMINI_API_KEY=AIzaSyA6WTJ1Vxb7y1c0uzM0iVEYS5vA_hsUflI


--------------------------------------------------------- */
