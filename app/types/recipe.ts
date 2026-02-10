export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  recipe_name: string;
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
}
