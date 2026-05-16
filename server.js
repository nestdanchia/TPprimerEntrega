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

