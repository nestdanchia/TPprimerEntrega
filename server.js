import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Variables de entorno (desde .env en local o Render en producción)
const GROQ_KEY = process.env.GROQ_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

console.log("GROQ_KEY length:", GROQ_KEY?.length);
console.log("OPENROUTER_KEY length:", OPENROUTER_KEY?.length);

// Body común para ambos proveedores
function buildBody(mensaje) {
  return JSON.stringify({
    model: "llama3-8b-8192",
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
  });
}

// Endpoint principal
app.post("/chat", async (req, res) => {
  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({
      texto: "Falta el mensaje del usuario.",
    });
  }

  // =========================
  // Intento 1 → GROQ
  // =========================
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: buildBody(mensaje),
      }
    );

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      console.log("Respuesta vía Groq");
      return res.json({
        texto: data.choices[0].message.content,
      });
    }

    console.warn("Groq falló:", data.error?.message);
  } catch (error) {
    console.warn("Groq no disponible:", error.message);
  }

  // =========================
  // Intento 2 → OpenRouter
  // =========================
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": CLIENT_URL,
          "X-Title": "Chat Laptop Store",
        },
        body: buildBody(mensaje),
      }
    );

    const data = await response.json();

    console.log("Respuesta vía OpenRouter");

    const texto =
      data.choices?.[0]?.message?.content ||
      data.error?.message ||
      "Sin respuesta";

    return res.json({ texto });
  } catch (error) {
    console.error("OpenRouter también falló:", error.message);

    return res.status(500).json({
      texto: "El servicio de IA no está disponible en este momento.",
    });
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});















