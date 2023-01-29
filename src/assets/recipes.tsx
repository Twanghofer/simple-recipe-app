interface Recipe {
  id: string;
  name: string;
  tags: string[];
  readyInMinutes: number;
  servings: number;
  imageUrl?: string;
  url?: string;
  ingredients?: {
    name: string;
    amount?: number;
    unit?: string;
  }[];
  instructions?: {
    description: string;
  }[];
}

const recipes: Recipe[] = [
  {
    name: "Oatmeal Chia Cup",
    tags: ["Breakfast", "Dinner", "Vegan", "Vegetarian"],
    readyInMinutes: 10,
    servings: 2,
    ingredients: [
      {
        name: "Rolled oats",
        amount: 2,
        unit: "tablespoon",
      },
      {
        name: "Chia seeds",
        amount: 1,
        unit: "tablespoon",
      },
      {
        name: "Milk of any kind",
        amount: 1 / 3,
        unit: "cup",
      },
      {
        name: "Yogurt of any kind",
        amount: 1 / 3,
        unit: "cup",
      },
      {
        name: "Honey or Maplesyrup",
        amount: 1,
        unit: "teaspoon",
      },
      {
        name: "Choppped fruit of your choice",
        amount: 1 / 4,
        unit: "cup",
      },
      {
        name: "Raisins or other dried fruit",
        amount: 1,
        unit: "tablespoon",
      },
      {
        name: "Chopped or sliced nut of your choice",
        amount: 1,
        unit: "tablespoon",
      },
    ],
    instructions: [
      {
        description: "Put the ingridients as listed in a bowl or a jar.",
      },
    ],
  },
  {
    name: "Vegan Chicken and Rice",
    tags: ["Lunch", "Dinner", "Vegan", "Vegetarian"],
    readyInMinutes: 20,
    servings: 2,
    imageUrl: "/images/vegan-chicken-and-rice.webp",
    ingredients: [
      {
        name: "Rice",
        amount: 1,
        unit: "cup",
      },
      {
        name: "Vegan Chicken",
        amount: 1,
        unit: "package",
      },
      {
        name: "Vegetables",
      },
      {
        name: "Oil",
      },
      {
        name: "Soy sauce",
      },
    ],
    instructions: [
      {
        description:
          "Start cooking the rice as instructed. Meanwhile start cutting the vegetables.",
      },

      {
        description:
          "Put a little bit of oil in a pan and start cooking the vegan chicken, shortly before the rice has soaked all the water.",
      },
      {
        description:
          "Put the vegetables in the pan with vegan chicken and let the mixture cook for a while, once the chicken is almost done.",
      },
      {
        description:
          "Lastly put the rice into the pan, add some soy sauce and stir it, while letting it cook on a low temperature.",
      },
    ],
  },
].map((recipe) => ({ ...recipe, id: crypto.randomUUID() }));

export default recipes;
