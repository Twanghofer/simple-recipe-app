import { useEffect, useRef, useState } from "react";
import { Recipe, getRecipesApiResponse } from "./assets/recipes";
import List from "./components/List";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [remainingRecipesCount, setRemainingRecipesCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const startedFetchingRecipes = useRef(false);

  const currentRecipe = recipes[activeIndex];
  const previousRecipe = recipes[activeIndex - 1];
  const nextRecipe = recipes[activeIndex + 1];

  const showNextRecipeButton = Boolean(nextRecipe || remainingRecipesCount);

  function getPreviousRecipe() {
    setActiveIndex((currentIndex) => currentIndex - 1);
  }

  async function getNextRecipe() {
    setActiveIndex((currentIndex) => currentIndex + 1);

    if (nextRecipe) {
      return;
    }

    const newRecipe = await getNewRecipe();

    if (!newRecipe) {
      return;
    }
  }

  async function getNewRecipe() {
    try {
      const { recipe, meta } = await getRecipe();

      if (!recipe) {
        return;
      }

      setRecipes((currentRecipes) => [...currentRecipes, recipe]);
      setRemainingRecipesCount(meta.remaining);

      return recipe;
    } catch (error) {
      console.log(error);
    }
  }

  async function getRecipe() {
    const usedIds = recipes.map((recipe) => recipe.id);

    //TODO: Add real API
    /* const { data:newRecipe } = await axios.get("/recipes", {
        params: {
          excludedIds: usedIds,
        },
      }); */

    return getRecipesApiResponse(usedIds);
  }

  useEffect(() => {
    if (!startedFetchingRecipes.current) {
      startedFetchingRecipes.current = true;
      getNewRecipe();
    }
  }, []);

  if (!currentRecipe) {
    //TODO: Add loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="isolate flex flex-col max-w-[900px] min-h-[100dvh] mx-auto">
      <div className="sticky top-0 -z-10">
        <img
          className=" h-[35vh] max-h-[322px] w-full object-cover bg-slate-200"
          src={currentRecipe?.imageUrl}
          alt={currentRecipe.name}
        />
        {previousRecipe && (
          <button
            onClick={getPreviousRecipe}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-5xl text-white mix-blend-difference"
            aria-label="Get new recipe"
          >
            &#x2039;
          </button>
        )}
        {showNextRecipeButton && (
          <button
            onClick={getNextRecipe}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-5xl text-white mix-blend-difference"
            aria-label="Get new recipe"
          >
            &#x203A;
          </button>
        )}
      </div>
      <div className="grow flex flex-col gap-6 p-6 pt-7 -mt-10 rounded-t-[3rem] bg-white">
        <header className="flex gap-3 items-start justify-between">
          <div className="grid gap-1">
            <div className="text-xs font-bold text-rose-500">
              {currentRecipe.tags.slice(0, 3).join(", ")}
            </div>
            <h1 className="text-3xl font-bold">{currentRecipe.name}</h1>
          </div>
          <div className="text-sm font-medium whitespace-nowrap text-stone-500">
            {currentRecipe.readyInMinutes} min
          </div>
        </header>
        <hr />
        <main className="grid gap-6">
          {currentRecipe?.url && (
            <a
              href={currentRecipe.url}
              target="_blank"
              rel="noreferrer"
              className=" md:mr-auto inline-block px-4 py-2 text-sm text-center font-medium text-white bg-rose-500 rounded-md"
            >
              See recipe
            </a>
          )}
          <List
            title="Ingredients"
            items={currentRecipe.ingredients?.map((ingridient) =>
              [
                ingridient.amount?.toLocaleString(),
                ingridient.unit,
                ingridient.name,
              ].join(" ")
            )}
          />
          <List
            title="Instructions"
            items={currentRecipe.instructions?.map(
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
