import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a mock response.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

const systemInstruction = `You are an expert AI assistant for SmartTax, a platform for Kenyan Revenue Authority (KRA) services. Your name is 'TaxBot'.
Your role is to provide clear, accurate, and helpful information about KRA processes, tax filing, and other related services, all within the context of the SmartTax application.
When providing guidance, instruct users on how to use the features available on SmartTax. Avoid referring to external portals like 'iTax' unless absolutely necessary for context, and always prioritize guiding the user through the SmartTax website.
Be friendly, professional, and concise.
Always refer to official KRA guidelines when possible, but do not provide financial advice.
Start your first response with a friendly greeting introducing yourself.`;

// We keep a single chat session in memory for the main chatbot to maintain conversation context.
let chat: Chat | null = null;

function getChatSession(): Chat {
  if (!ai) {
    // This case should not be hit if API_key is missing due to the check in runChat
    throw new Error('Gemini AI not initialized.');
  }
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction
      },
    });
  }
  return chat;
}

export const createServiceChatSession = (serviceTitle: string): Chat | null => {
    if (!ai) return null;

    const serviceContextInstruction = `You are an expert AI assistant for SmartTax, a platform for Kenyan Revenue Authority (KRA) services. Your name is 'TaxBot'.
    Your current focus is to help the user with the "${serviceTitle}" service within the SmartTax application. 
    Provide clear, step-by-step guidance on how to complete this service using the tools available here on SmartTax. Avoid referring to external portals like 'iTax'.
    Be friendly, professional, and concise.
    Do not discuss other services unless the user explicitly asks.
    Start your first response with a friendly greeting, confirming you're ready to help with the "${serviceTitle}" service on SmartTax.`;
    
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: serviceContextInstruction
        },
    });
};


export const runChat = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    // Mock response if API key is not available
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `This is a mock response because the API key is not configured. For your question about "${prompt}", you should visit the official KRA website for the most accurate information.`;
  }

  try {
    const chatSession = getChatSession();
    const response = await chatSession.sendMessage({ message: prompt });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // On error, the chat session might be in a bad state, so we reset it.
    chat = null; 
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};