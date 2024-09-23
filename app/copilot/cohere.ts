"use server";
import { CohereClient } from "cohere-ai";

const token = process.env["COHERE_TOKEN"];

const cohere = new CohereClient({
  token,
});

export type ChatMessage = {
  role: "USER" | "CHATBOT";
  message: string;
};

export async function askTheCopilot(userPrompt: string, chatHistory: ChatMessage[] = [], category?: string): Promise<string> {
  const stream = await cohere.chatStream({
    model: "command-r-plus",
    message: category 
      ? `Por favor, proporciona información sobre la siguiente pregunta, centrándote en la categoría ${category} de las noticias de La Silla Vacía:\n\n${userPrompt}`
      : userPrompt,
    temperature: 0.3,
    chatHistory,
    promptTruncation: "AUTO",
    connectors: [{"id":"web-search","options":{"site":"https://www.lasillavacia.com/"}}]
  });

  let response = "";
  for await (const chat of stream) {
      if (chat.eventType === "text-generation") {
          response += chat.text;
      }
  }

  return response;
}