"use server";

import OpenAI from "openai";
import type { Recipe } from "../types/recipe";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not set");
}

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "AI Recipe Nutrition App",
  },
});

export async function generateRecipe(
  ingredients: string[]
): Promise<Recipe[]> {
  const response = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are a professional chef and nutritionist.

Generate 3 DIFFERENT recipes using the given ingredients.

Each recipe MUST include:
- recipe_name (string)
- ingredients (string[])
- instructions (string[])
- nutrition (object with calories, protein, carbs, fat per serving)

Base nutrition on USDA averages.

Return ONLY valid JSON in this exact format:
{
  "recipes": [
    {
      "recipe_name": "",
      "ingredients": [],
      "instructions": [],
      "nutrition": {
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0
      }
    }
  ]
}
        `,
      },
      {
        role: "user",
        content: ingredients.join(", "),
      },
    ],
    response_format: { type: "json_object" },
  });

  const data = JSON.parse(response.choices[0].message.content!);

  
  return (data.recipes || []).map((recipe: any) => ({
    recipe_name: recipe.recipe_name ?? "Unnamed Recipe",
    ingredients: recipe.ingredients ?? [],
    instructions: recipe.instructions ?? [],
    nutrition:
      recipe.nutrition ??
      recipe.nutrition_per_serving ?? {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
  }));
}
