import IngredientForm from "./components/IngredientForm";
import SavedRecipes from "./components/SavedRecipes";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black max-w-2xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">
        AI Recipe Nutrition App
      </h1>

      
      <IngredientForm />

    
      <hr className="my-6" />

      
      <SavedRecipes />
    </main>
  );
}
