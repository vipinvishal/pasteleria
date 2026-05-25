export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "cakes" | "pastries" | "savory" | "beverages";
  image: string;
  rating: number;
  tags: string[];
  allergens?: string[];
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface CakeCustomizerState {
  size: "0.5kg" | "1kg" | "1.5kg" | "2kg" | "3kg";
  shape: "Round" | "Heart" | "Square" | "Star";
  flavor: "Chocolate Truffle" | "Red Velvet" | "Salted Caramel Symphony" | "Mango Cream Cloud" | "Strawberry Delight" | "Hazelnut Praline";
  tiers: 1 | 2 | 3;
  frostingColor: string; // Hex color code or description
  toppings: string[]; // List of toppings
  customMessage: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "menu" | "custom_cake";
  details?: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "chef";
  content: string;
  timestamp: string;
}
