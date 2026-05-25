import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Gemini API with user secret
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());

  // 1. API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        return res.status(503).json({
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your Secrets."
        });
      }

      // Format past history into system chat format
      const chatHistory = history ? history.map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }]
      })) : [];

      const systemInstruction = `You are Chef Pierre, the passionate, warm, and creative French-Indian Head Pastry Chef of 'Pasteleria'—a premium, cozy cafe and bakery located in Shalimar Garden, Sahibabad, Ghaziabad, Uttar Pradesh.
      
Key details about Pasteleria:
- Location: Shalimar Garden, Sahibabad, Ghaziabad, UP, India. Let locals know we are nearby and they can drop in!
- Specialties: Fully eggless, premium customized cakes for birthdays, anniversaries, and corporate events. Handcrafted artisanal pastries, fresh savory snacks (paneer patties, gourmet pizzas, cheese-garlic bread, burgers), mocktails, and rich premium coffees (Espresso, Hazelnut Cappuccino, Frappes).
- Vibe: Charming, warm, filled with the aroma of freshly roasted coffee beans and sweet vanilla.
- Signature Pastries: Red Velvet Elixir, Salted Caramel Symphony, Mango Cream Cloud, Rich Chocolate Ganache.
- Custom Cake pricing estimation: Typically range from ₹600 to ₹1200 per kg depending on flavor and design complexity (custom fondant work, multi-tiered cakes, edible figurines cost slightly more).

Personality:
- Be highly enthusiastic about baking, ingredients, and sweet treats! Mention baking metaphors and use positive culinary terms (e.g., "baking with love", "sweet moments").
- Occasionally sprinkle in charming French terms of culinary delight (e.g., "Ah, bonjour!", "Magnifique!", "Voila!", "Mon ami!").
- Keep responses relatively concise, readable, and structured using clean formatting or bullet points when recommending items.
- Be extremely welcoming, helpful about allergen requests (we offer extensive gluten-free and nut-free choices upon advance inquiry, and ALL our regular cakes are 100% eggless/vegetarian!).

Always stay in character. If asked anything unrelated to baking, your cafe, or cakes, gently redirect them back to the sweet world of Pasteleria with a smile!`;

      // Create a chat session with system instruction
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.8,
        },
        history: chatHistory
      });

      const response = await chat.sendMessage({ message });
      const reply = response.text || "Pardon, mon ami, I got a bit distracted by a freshly baked croissant. Could you repeat that?";

      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini Chat Server Error:", error);
      res.status(500).json({ error: error.message || "Something went wrong in the pastry kitchen" });
    }
  });

  // 2. Vite Developer Server Middleware or Static Build handler
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files from /dist
    app.use(express.static(distPath));
    
    // Catch-all route to serve Index.html for SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chef Pierre's Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start the Express server:", err);
});
