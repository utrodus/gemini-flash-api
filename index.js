import "dotenv/config";
import express from "express";
import multer from "multer";
import fs from "fs/promises";
import { GoogleGenAI } from "@google/genai";
import { extractText } from "./extract-text.js";

const app = express();
const upload = multer();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// **Set your default Gemini model here:**
const GEMINI_MODEL = "gemini-2.5-flash";

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));

// 1. Generate Text
app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    res.json({ result: extractText(resp) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Generate from Image
app.post("/generate-from-image", upload.single("image"), async (req, res) => {
  try {
    const { prompt } = req.body;
    const imageBase64 = req.file.buffer.toString("base64");
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt },
        { inlineData: { mimeType: req.file.mimetype, data: imageBase64 } },
      ],
    });
    res.json({ result: extractText(resp) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Generate from Document
app.post(
  "/generate-from-document",
  upload.single("document"),
  async (req, res) => {
    try {
      const { prompt } = req.body;
      const docBase64 = req.file.buffer.toString("base64");
      const resp = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
          { text: prompt || "Summarize this document: " },
          {
            inlineData: { mimeType: req.file.mimetype, data: docBase64 },
          },
        ],
      });
      res.json({ result: extractText(resp) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// 4. Generate from audio file
app.post("/generate-from-audio", upload.single("audio"), async (req, res) => {
  try {
    const { prompt } = req.body;
    const audioBase64 = req.file.buffer.toString("base64");
    const resp = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt || "Give me transcript from this audio: " },
        {
          inlineData: { mimeType: req.file.mimetype, data: audioBase64 },
        },
      ],
    });
    res.json({ result: extractText(resp) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
