// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getFirestore,
} from "firebase/firestore";
import { Recipe } from "./types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHaGlKud9JknK8XdmdO1xE2PuFo5t3JSA",
  authDomain: "recipes-app-226f0.firebaseapp.com",
  projectId: "recipes-app-226f0",
  storageBucket: "recipes-app-226f0.appspot.com",
  messagingSenderId: "428015838940",
  appId: "1:428015838940:web:4f666c857ba86d1710b619",
};

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<T>): T => snapshot.data(),
});

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const dataPoint = <T extends DocumentData>(collectionPath: string) =>
  collection(firestore, collectionPath).withConverter(converter<T>());

export const db = {
  recipes: dataPoint<Recipe>("recipes"),
};
