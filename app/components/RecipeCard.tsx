import type { Recipe } from "../types/recipe";
import { saveRecipe } from "../utils/storage";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-white text-black rounded-lg p-6 space-y-4 shadow">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">
          {recipe.recipe_name}
        </h2>

        <button
          onClick={() => saveRecipe(recipe)}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
        >
          💾 Save
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Ingredients</h3>
        <ul className="list-disc list-inside text-sm">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Instructions</h3>
        <ol className="list-decimal list-inside text-sm space-y-1">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
