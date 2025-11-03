import { isAxiosError } from "axios";
import axios from "axios";

export type SummaryForm = {
  textToSummarize: string;
};

const API_URL = "http://127.0.0.1:8000/resumir";

export async function getSummaryIA({ textToSummarize }: SummaryForm) {
  try {
    const response = await axios.post(API_URL, {
      texto: textToSummarize,
    });

    return response.data.resumen;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Error al generar resumen");
    }
    throw error;
  }
}
