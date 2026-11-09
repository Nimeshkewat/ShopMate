import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    timeout: 30_000,
    retryOptions: { attempts: 1 },
  },
});

export interface AIProductCandidate {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
}

const getAIRecommendation = async (
  prompt: string,
  candidates: AIProductCandidate[]
): Promise<string[]> => {
  const geminiPrompt = `
  Candidate products:
  ${JSON.stringify(candidates)}

  Return only the IDs of products that match this shopping request, ordered by relevance. Do not invent IDs:
  "${prompt}"
  `;

  const startedAt = Date.now();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: geminiPrompt,
      config: {
        systemInstruction:
          "You are a precise shopping assistant. Match the user's intent to the supplied inventory. Return only IDs from the candidate list as a JSON array, in relevance order. Do not invent products.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        maxOutputTokens: 1024,
      },
    });

    if (!response.text) {
      throw new Error("AI recommendation returned an empty response");
    }

    const recommendedIds: unknown = JSON.parse(response.text);
    if (
      !Array.isArray(recommendedIds) ||
      !recommendedIds.every((id): id is string => typeof id === "string")
    ) {
      throw new Error("AI recommendation returned an invalid response");
    }

    const candidateIds = new Set(candidates.map(({ _id }) => _id));
    return [...new Set(recommendedIds)].filter((id) => candidateIds.has(id));
  } finally {
    console.info(`[ai-search] Gemini request took ${Date.now() - startedAt}ms`);
  }
};

export default getAIRecommendation;
