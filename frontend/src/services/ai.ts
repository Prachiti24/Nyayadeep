// ai.ts

import {
  GenerationConfig,
  GenerativeModel,
  GoogleGenerativeAI,
} from "@google/generative-ai";

// Store Gemini model
let model: GenerativeModel | null = null;

// Initialize Gemini AI
export const initializeAI = (apiKey: string) => {

  // Check API key
  if (!apiKey) {
    console.error("Gemini API key missing");
    return;
  }

  try {

    // Create Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Use Gemini 1.5 Flash model
    model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    console.log("Gemini initialized successfully");

  } catch (error) {

    console.error("Gemini Initialization Error:", error);
  }
};

// Generate AI response
export const generateResponse = async (message: string) => {

  try {

    // Check if model exists
    if (!model) {
      throw new Error("AI model not initialized");
    }

    // Generation settings
    const generationConfig: GenerationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    // Generate content
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
      generationConfig,
    });

    // Extract response text
    const response = result.response.text();

    console.log("Gemini Response:", response);

    return response;

  } catch (error) {

    console.error("Generate Response Error:", error);

    return "Sorry, AI is currently unavailable.";
  }
};