import { openrouter } from "@/lib/ai";
import { generateText } from "ai";

export async function generateResponse(
  essayTopic: string,
  essayContent: string
) {
  const result = await generateText({
    model: openrouter("gpt-4o-mini"),
    messages: [
      {
        role: "system",
        content: `
You are an expert writing tutor specialized in reviewing essays, giving corrections, and providing tips for improvement.

You will receive 2 inputs:
1. Essay Topic
2. Essay Content

Instructions:

1. Check the essay for clarity, grammar, style, and structure.
2. Generate only the following sections in **Markdown format**:

|

***Correcciones y Feedback***\n
(Indica errores gramaticales, ortográficos, de estilo y estructura con sugerencias)

|

***Ensayo Mejorado***\n
(Reescribe el ensayo de forma más clara, coherente y estilísticamente correcta, manteniendo la idea del usuario)

|

***Recomendaciones Generales***\n
(Tips para mejorar futuros ensayos: vocabulario, estructura, argumentación, cohesión)

|

Important:
- Keep the output concise but clear.
- Use Markdown formatting with lists and headings.
- Do NOT include any instructions or extra text outside these sections.
- Preserve line breaks so Markdown lists and paragraphs render correctly.
        `,
      },
      {
        role: "user",
        content: `
📝 Tema del ensayo:
${essayTopic}

✍️ Ensayo del usuario:
${essayContent}
        `,
      },
    ],
  });

  return result.text;
}
