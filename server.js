import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Las keys se leen desde variables de entorno — nunca hardcodeadas en el codigo.
// En local: archivo .env en la raiz.
// En Render: dashboard → Environment → Add Variable.
const GROQ_KEY       = process.env.GROQ_API_KEY;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;

console.log("GROQ_KEY length:", GROQ_KEY?.length);
console.log("OPENROUTER_KEY length:", OPENROUTER_KEY?.length);

// Arma el body comun para ambos proveedores (mismo formato OpenAI).
function buildBody(mensaje) {
  return JSON.stringify({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content: "Eres un vendedor experto de laptops. Responde claro, concreto y recomienda modelos según uso.",
      },
      {
        role: "user",
        content: mensaje,
      },
    ],
  });
}

// Intenta con Groq. Si falla o devuelve error, intenta con OpenRouter.
// Ambos usan el mismo formato de request y response (estandar OpenAI).
app.post("/chat", async (req, res) => {
  const { mensaje } = req.body;

  // Intento 1: Groq
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: buildBody(mensaje),
    });

    const data = await response.json();

    if (data.choices?.[0]?.message?.content) {
      console.log("Respuesta via Groq");
      return res.json({ texto: data.choices[0].message.content });
    }

    // Si Groq respondio pero con error, caemos al fallback
    console.warn("Groq fallo:", data.error?.message);

  } catch (errGroq) {
    console.warn("Groq no disponible:", errGroq.message);
  }

  // Intento 2: OpenRouter como fallback
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.CLIENT_URL || "http://localhost:5173",
        "X-Title": "Chat Laptop Store",
      },
      body: buildBody(mensaje),
    });

    const data = await response.json();
    console.log("Respuesta via OpenRouter");

    const texto =
      data.choices?.[0]?.message?.content ||
      data.error?.message ||
      "Sin respuesta";

    return res.json({ texto });

  } catch (errOpenRouter) {
    console.error("OpenRouter tambien fallo:", errOpenRouter.message);
    res.status(500).json({ texto: "El servicio de IA no esta disponible en este momento." });
  }
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});
