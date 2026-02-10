import type { Recipe } from "../types/recipe";

const KEY = "saved_recipes";

export function getSavedRecipes(): Recipe[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveRecipe(recipe: Recipe) {
  const recipes = getSavedRecipes();

  // prevent duplicates
  if (recipes.find((r) => r.recipe_name === recipe.recipe_name)) return;

  localStorage.setItem(KEY, JSON.stringify([...recipes, recipe]));
}

export function removeRecipe(name: string) {
  const recipes = getSavedRecipes().filter(
    (r) => r.recipe_name !== name
  );
  localStorage.setItem(KEY, JSON.stringify(recipes));
}
