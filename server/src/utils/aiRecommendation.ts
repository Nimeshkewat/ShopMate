import type { Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";
import { type IProduct } from "../modules/product/productModel.js";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const getAIRecommendation = async (
  prompt: string,
  filteredProducts: IProduct[]
): Promise<{ success: boolean; products: IProduct[] }> => {
  const geminiPrompt = `
  You are an expert personal shopping assistant. Below is a list of candidate products fetched from our database:
  ${JSON.stringify(filteredProducts)}

  Based strictly on the following user search intent, filter down the candidates and return only the best matching products:
  "${prompt}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: geminiPrompt,
      config: {
        systemInstruction:
          "You are a precise inventory matching assistant. Filter the input JSON product list according to the user's intent. Do not fabricate new products. Maintain all original object key values (like _id, userId, urls) exactly as they are provided in the input.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              _id: { type: Type.STRING },
              userId: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              price: { type: Type.NUMBER },
              category: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              stock: { type: Type.NUMBER },
              images: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    public_id: { type: Type.STRING },
                    url: { type: Type.STRING },
                  },
                  required: ["public_id", "url"],
                },
              },
              createdAt: { type: Type.STRING },
              updatedAt: { type: Type.STRING },
            },
            // Enforce key properties to ensure structural integrity
            required: ["_id", "name", "price", "category", "images"],
          },
        },
      },
    });

    if (!response.text) {
      return { success: false, products: [] };
    }

    const recommendedProducts: IProduct[] = JSON.parse(response.text);

    return {
      success: true,
      products: recommendedProducts,
    };
  } catch (error) {
    console.error("Gemini Filter Error:", error);
    // Safe degradation: Return database regex matches if AI evaluation errors out
    return {
      success: false,
      products: filteredProducts,
    };
  }
};

export default getAIRecommendation;
