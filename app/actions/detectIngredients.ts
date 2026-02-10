"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function detectIngredients(imageBase64: string): Promise<string[]> {
  const response = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are a food recognition AI.
Look at the image and list ONLY the visible food ingredients.
Return a comma-separated list.
Do NOT explain.
        `,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: imageBase64,
            },
          },
        ],
      },
    ],
  });

  const text = response.choices[0].message.content || "";
  return text
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);
}
