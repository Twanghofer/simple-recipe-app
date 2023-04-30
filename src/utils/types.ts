export interface Recipe {
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
