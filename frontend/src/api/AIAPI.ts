import type { IAForm } from "@/views/writing/SendIAView";
import { isAxiosError } from "axios";
import { generateResponse } from "./AIResponse";

export async function getResponseIA({ jobDescription, userInfo }: IAForm) {
  try {
    const data = await generateResponse(jobDescription, userInfo);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
