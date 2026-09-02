import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Allow requests from your GitHub Pages frontend
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS setup
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY environment variable in Vercel." });
  }

  try {
    // Safely parse body parameters
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const textInput = body.prompt || body.message || "Hello";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(textInput);
    const response = await result.response;
    const responseText = response.text();

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const { prompt, message } = req.body || {};
    const userPrompt = prompt || message;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const responseText = response.text();

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
