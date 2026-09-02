import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Ensure API Key exists
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key is missing in Vercel environment settings." });
  }

  // 2. Extract prompt from frontend request
  const userPrompt = req.body?.prompt || req.body?.message || "Hello";

  try {
    // 3. Initialize Gemini SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // 4. Generate AI response
    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    // 5. Send clean response back to frontend
    return res.status(200).json({
      candidates: [
        {
          content: {
            parts: [{ text: responseText }]
          }
        }
      ]
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
