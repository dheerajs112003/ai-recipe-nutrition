"use client";

import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe";
import { getSavedRecipes, removeRecipe } from "../utils/storage";
import RecipeCard from "./RecipeCard";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeName, setActiveName] = useState<string | null>(null);

  useEffect(() => {
    setRecipes(getSavedRecipes());
  }, []);

  if (recipes.length === 0) return null;

  function toggleRecipe(name: string) {
    setActiveName((prev) => (prev === name ? null : name));
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Saved Recipes</h2>

      {recipes.map((recipe) => {
        const isOpen = activeName === recipe.recipe_name;

        return (
          <div
            key={recipe.recipe_name}
            className="border rounded bg-white text-black"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3">
              <button
                onClick={() => toggleRecipe(recipe.recipe_name)}
                className="font-medium text-left"
              >
                {recipe.recipe_name}
              </button>

              <button
                onClick={() => {
                  removeRecipe(recipe.recipe_name);
                  setRecipes(getSavedRecipes());
                  if (activeName === recipe.recipe_name) {
                    setActiveName(null);
                  }
                }}
                className="text-sm text-red-600"
              >
                Remove
              </button>
            </div>

            {/* Toggle content */}
            {isOpen && (
              <div className="p-3 border-t">
                <RecipeCard recipe={recipe} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
