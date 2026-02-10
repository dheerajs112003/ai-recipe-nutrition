import type { Nutrition } from "../types/recipe";
import ProgressBar from "./ProgressBar";

const DAILY_CALORIES = 2000;

export default function NutritionCard({
  nutrition,
  multiplier,
}: {
  nutrition: Nutrition;
  multiplier: number;
}) {
  const scaled = {
    calories: nutrition.calories * multiplier,
    protein: nutrition.protein * multiplier,
    carbs: nutrition.carbs * multiplier,
    fat: nutrition.fat * multiplier,
  };

  return (
    <div className="bg-white text-black rounded-lg p-6 shadow space-y-4">
      <h3 className="font-semibold text-lg">
        Nutrition ({multiplier} serving{multiplier > 1 ? "s" : ""})
      </h3>

      {/* Calories */}
      <div className="space-y-2">
        <div className="text-sm font-medium">
          Calories: {scaled.calories} kcal
        </div>

        <ProgressBar
          label="Daily Calories"
          value={scaled.calories}
          max={DAILY_CALORIES}
        />
      </div>

      {/* Macros */}
      <div className="space-y-3">
        <ProgressBar
          label={`Protein (${scaled.protein} g)`}
          value={scaled.protein}
          max={150}
        />

        <ProgressBar
          label={`Carbs (${scaled.carbs} g)`}
          value={scaled.carbs}
          max={300}
        />

        <ProgressBar
          label={`Fat (${scaled.fat} g)`}
          value={scaled.fat}
          max={70}
        />
      </div>
    </div>
  );
}
