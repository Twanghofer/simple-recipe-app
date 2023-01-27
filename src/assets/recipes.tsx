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
    name: "Test recipe",
    tags: ["Lunch"],
    readyInMinutes: 20,
    servings: 2,
    url: "https://www.google.com",
  },
  {
    name: "Vegan Chicken and Rice",
    tags: ["Lunch", "Dinner", "Vegan", "Vegetarian"],
    readyInMinutes: 20,
    servings: 2,
    imageUrl: "/images/vegan-chicken-and-rice.webp",
    ingredients: [
      {
        name: "Lorem ipsum dolor sit amet",
        amount: 1,
        unit: "kg",
      },
      {
        name: "consectetur adipiscing elit",
      },
    ],
    instructions: [
      {
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    ],
  },
].map((recipe) => ({ ...recipe, id: crypto.randomUUID() }));

export default recipes;
