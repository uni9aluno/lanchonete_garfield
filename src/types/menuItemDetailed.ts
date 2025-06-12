export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
}

export interface MenuItemDetailed extends MenuItemType {
  longDescription: string;
  ingredients: string[];
  nutritionalInfo: NutritionalInfo;
  allergens: string[];
  servingInfo: string;
  gallery: string[];
  tags: string[];
}
