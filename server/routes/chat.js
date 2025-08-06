const express = require("express");
const { OpenAI } = require("openai");
const Chat = require("../models/Chat");
require("dotenv").config();

const router = express.Router();

// Initialize Groq API via OpenAI-compatible SDK
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // ✅ Groq endpoint
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "llama3-8b-8192", // or "mixtral-8x7b-32768"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const reply = chatCompletion.choices[0].message.content;

    await Chat.create({ role: "user", content: message });
    await Chat.create({ role: "assistant", content: reply });

    res.json({ reply });
  } catch (err) {
    console.error("❌ Groq error:", err.message || err);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

module.exports = router;



