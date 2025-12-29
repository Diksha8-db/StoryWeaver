import { GoogleGenerativeAI } from "@google/generative-ai";

// configuring the gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System instruction 
const SYSTEM_INSTRUCTION = `
You are a cultural linguist and oral historian.

Given a spoken story in a local Indian dialect:
1. Translate it into clear English.
2. Preserve emotional tone.
3. Explain idioms, traditions, rituals, and cultural references.
4. Generate a short meaningful summary.
5. Suggest a suitable title.

Return the response strictly in VALID JSON with keys:
- title (string)
- translatedText (string)
- culturalNotes (array of strings)
- summary (string)

Do NOT include any extra text outside JSON.
`;

export async function askGemini({ content }) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: content }],
      },
    ],
  });

//   console.log("GEMINI RESULT : ", result)

  const text = result.response.text();
//   console.log(text)

  return text; 
}
