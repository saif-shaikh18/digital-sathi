const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
  // CORS Headers
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
    let textInput = "Hello";

    if (req.method === "POST" && req.body) {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      textInput = body.prompt || body.message || "Hello";
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const result = await model.generateContent(textInput);
    const response = await result.response;
    const responseText = response.text();

    return res.status(200).json({ reply: responseText });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
