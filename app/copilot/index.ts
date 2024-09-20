"use server"
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// To authenticate with the model you will need to generate a personal access token (PAT) in your GitHub settings. 
// Create your PAT token by following instructions here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const token = process.env["GITHUB_TOKEN"];

export async function askTheCopilot(userPrompt: string, category?: string): Promise<string> {
    if (!token) {
        throw new Error("GITHUB_TOKEN environment variable is not set");
    }

    // @ts-expect-error: model client type is not exported
    const client = new ModelClient("https://models.inference.ai.azure.com", new AzureKeyCredential(token));

    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "system", content: "You are a helpful assistant that can answer questions about the latest news from La Silla Vacía. When a specific category is provided, focus your response on that category." },
                { role: "user", content: category 
                    ? `Please provide information about the following question, focusing on the ${category} category of La Silla Vacía news:\n\n${userPrompt}`
                    : userPrompt
                }
            ],
            model: "Cohere-command-r-plus",
            temperature: 1,
            max_tokens: 4096,
            top_p: 1,
            promptTruncation: "AUTO",
            connectors: [{"id":"web-search","options":{"site":"https://www.lasillavacia.com/"}}]
        }
    });

    if (response.status !== "200") {
        throw response.body.error;
    }
    return response.body.choices[0].message.content;
}
