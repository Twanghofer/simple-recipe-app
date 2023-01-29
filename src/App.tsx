import { useState } from "react";
import recipes from "./assets/recipes";
import List from "./components/List";

function App() {
  const [usedRecipes, setUsedRecipes] = useState([getRandomRecipe()]);
  const [index, setIndex] = useState(0);

  const previousRecipe = usedRecipes?.[index - 1];
  const nextRecipe = usedRecipes?.[index + 1];
  const recipe = usedRecipes?.[index];

  function getRandomRecipe() {
    return recipes[Math.floor(Math.random() * recipes.length)];
  }

  function getPreviousRecipe() {
    setIndex(index - 1);
  }

  function getNextRecipe() {
    if (!nextRecipe) {
      getNewRecipe();
    }

    setIndex(index + 1);
  }

  function getNewRecipe() {
    if (usedRecipes.length === recipes.length) return;

    let newRecipe = getRandomRecipe();
    while (usedRecipes.find((usedRecipe) => usedRecipe.id === newRecipe.id)) {
      newRecipe = getRandomRecipe();
    }
    setUsedRecipes([...usedRecipes, newRecipe]);
  }

  return (
    <div className="isolate flex flex-col max-w-[900px] min-h-[100dvh] mx-auto">
      <div className="sticky top-0 -z-10">
        <img
          className=" h-[35vh] max-h-[322px] w-full object-cover bg-slate-200"
          src={recipe?.imageUrl}
          alt={recipe.name}
        />
        {(nextRecipe || usedRecipes.length !== recipes.length) && (
          <button
            onClick={getNextRecipe}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-5xl text-white mix-blend-difference"
            aria-label="Get new recipe"
          >
            &#x203A;
          </button>
        )}
        {previousRecipe && (
          <button
            onClick={getPreviousRecipe}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-5xl text-white mix-blend-difference"
            aria-label="Get new recipe"
          >
            &#x2039;
          </button>
        )}
      </div>
      <div className="grow flex flex-col gap-6 p-6 pt-7 -mt-10 rounded-t-[3rem] bg-white">
        <header className="flex gap-3 items-start justify-between">
          <div className="grid gap-1">
            <div className="text-xs font-bold text-rose-500">
              {recipe.tags.slice(0, 3).join(", ")}
            </div>
            <h1 className="text-3xl font-bold">{recipe.name}</h1>
          </div>
          <div className="text-sm font-medium whitespace-nowrap text-stone-500">
            {recipe.readyInMinutes} min
          </div>
        </header>
        <hr />
        <main className="grid gap-6">
          {recipe?.url && (
            <a
              href={recipe.url}
              target="_blank"
              rel="noreferrer"
              className=" md:mr-auto inline-block px-4 py-2 text-sm text-center font-medium text-white bg-rose-500 rounded-md"
            >
              See recipe
            </a>
          )}
          <List
            title="Ingredients"
            items={recipe.ingredients?.map((ingridient) =>
              [
                ingridient.amount?.toLocaleString(),
                ingridient.unit,
                ingridient.name,
              ].join(" ")
            )}
          />
          <List
            title="Instructions"
            items={recipe.instructions?.map(
              (instruction) => instruction.description
            )}
            type="numeric"
          />
        </main>
      </div>
    </div>
  );
}

export default App;
