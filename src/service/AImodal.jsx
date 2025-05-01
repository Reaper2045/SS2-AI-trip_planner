import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const config = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const response = await model.generateContent({
    model: "gemini-1.5-flash",
    contents: "Explain how AI works",
    config: config,
  });

  console.log(response.text());
}

await main();