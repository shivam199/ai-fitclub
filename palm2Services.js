import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

// Initialize GoogleGenerativeAI client
const client = new GoogleGenerativeAI(API_KEY);

const extractJSON = (output) => {
  const jsonStartIndex = output.indexOf("[");
  const jsonEndIndex = output.lastIndexOf("]") + 1;
  const json = output.substring(jsonStartIndex, jsonEndIndex);
  return JSON.parse(json);
};

export const generateText = async (prompt) => {
  try {
    const model = client.getGenerativeModel({ model: MODEL_NAME });
    
    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 0.25,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 5000,
      },
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await chatSession.sendMessage(prompt);
    return extractJSON(response.response.text());
  } catch (e) {
    console.error("Error generating text:", e);
    throw new Error(e instanceof Error ? e.message : String(e));
  }
};
