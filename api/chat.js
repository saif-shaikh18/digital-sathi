import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY environment variable" });
    }

    let userPrompt = "Hello";
    if (req.body?.contents?.[0]?.parts?.[0]?.text) {
      userPrompt = req.body.contents[0].parts[0].text;
    } else if (req.body?.prompt) {
      userPrompt = req.body.prompt;
    } else if (req.body?.message) {
      userPrompt = req.body.message;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

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
