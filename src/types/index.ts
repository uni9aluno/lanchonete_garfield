export interface MenuItemType {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  category: string;
  image: string;
  isPopular: boolean;
  tags?: string[];
  gallery?: string[];
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens?: string[];
  servingInfo?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface DetailedMenuItemType extends MenuItemType {
  longDescription: string;
  tags: string[];
  gallery: string[];
  ingredients: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens: string[];
  servingInfo: string;
}