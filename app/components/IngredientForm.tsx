"use client";

import { useState, useTransition } from "react";
import RecipeCard from "./RecipeCard";
import NutritionCard from "./NutritionCard";
import type { Recipe } from "../types/recipe";
import { generateRecipe } from "../actions/generateRecipe";
import { detectIngredients } from "../actions/detectIngredients";

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [servings, setServings] = useState(1);
  const [isScanning, setIsScanning] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError(null);
    setRecipes([]);
    setServings(1);

    const list = ingredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    if (list.length === 0) {
      setError("Please enter at least one ingredient.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await generateRecipe(list);
        setRecipes(result);
      } catch {
        setError("Failed to generate recipes. Try again.");
      }
    });
  }

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsScanning(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const detected = await detectIngredients(base64);

        if (detected.length === 0) {
          setError("No ingredients detected. Try another image.");
        } else {
          setIngredients(detected.join(", "));
        }
      } catch {
        setError("Failed to detect ingredients from image.");
      } finally {
        setIsScanning(false);
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6">
      {/* Camera / Upload */}
      <div className="flex items-center gap-3">
        <label className="cursor-pointer px-3 py-2 border rounded text-sm bg-white">
          📷 Scan Ingredients
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {isScanning && (
          <span className="text-sm text-gray-600">
            Scanning image…
          </span>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full p-3 border rounded bg-white text-black"
          rows={3}
          placeholder="eggs, onion, tomato"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <button
          type="submit"
          disabled={isPending || isScanning}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {isPending ? "Generating..." : "Generate Recipes"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Servings selector */}
      {recipes.length > 0 && (
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Servings:</label>
          <select
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
            <option value={4}>4x</option>
          </select>
        </div>
      )}

      {/* Results */}
      {recipes.length > 0 && (
        <div className="grid gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.recipe_name} className="space-y-4">
              <RecipeCard recipe={recipe} />

              {recipe.nutrition && (
                <NutritionCard
                  nutrition={recipe.nutrition}
                  multiplier={servings}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
