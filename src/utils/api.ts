import { addDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Recipe } from "./types";

export async function addRecipe(recipe: Recipe) {
  return await addDoc(db.recipes, recipe);
}

export async function getRandomRecipe(exludedDocIds: string[] = []) {
  const querySnapshot = await getDocs(db.recipes);
  const allDocs = querySnapshot.docs;

  const unusedDocIds = allDocs
    .map((doc) => doc.id)
    .filter((id) => !exludedDocIds.includes(id));

  if (!unusedDocIds.length) {
    return { documentSnapshot: null, hasMoreRecipes: false };
  }

  const randomDocId =
    unusedDocIds[Math.floor(Math.random() * unusedDocIds.length)];

  const documentSnapshot = await getDoc(doc(db.recipes, randomDocId));

  return {
    documentSnapshot,
    hasMoreRecipes: unusedDocIds.length > 1,
  };
}
