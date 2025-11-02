import type { IAForm } from "@/views/writing/SendIAView";
import { isAxiosError } from "axios";
import { generateResponse } from "./AIResponse";

export async function getResponseIA({ essayTopic, essayContent }: IAForm) {
  try {
    const data = await generateResponse(essayTopic, essayContent);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
