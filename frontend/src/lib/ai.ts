import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_API_IA_KEY,
});

/*import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export const openrouter = createOpenRouter({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_API_IA_KEY,
});*/
