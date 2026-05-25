import { MenuItem, Review } from "./types";
import heroImage from "./assets/images/pasteleria_cafe_hero_1779640848749.png";
import customCakeDisplay from "./assets/images/custom_cake_display_1779640866560.png";

// Paths of the generated assets from AI Studio
export const HERO_IMAGE = heroImage;
export const CUSTOM_CAKE_DISPLAY = customCakeDisplay;

export const CATEGORIES = [
  { id: "all", name: "Full Menu", icon: "UtensilsCrossed" },
  { id: "cakes", name: "Artisanal Cakes", icon: "Cake" },
  { id: "pastries", name: "Fresh Pastries", icon: "Cookie" },
  { id: "savory", name: "Savory Bites", icon: "Pizza" },
  { id: "beverages", name: "Fine Brews & Shakes", icon: "Coffee" },
];

export const MENU_ITEMS: MenuItem[] = [
  // Artisanal Cakes (All 100% Eggless by default, as loved by Ghaziabad patrons!)
  {
    id: "royal-truffle-cake",
    name: "Royal Dutch Chocolate Truffle",
    description: "Layers of moist, eggless chocolate sponge smothered in silky smooth dark Belgian chocolate ganache.",
    price: 650,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    tags: ["Best Seller", "100% Eggless", "Premium"],
    allergens: ["Gluten", "Dairy"]
  },
  {
    id: "crimson-velvet-cake",
    name: "Crimson Velvet Dream",
    description: "Striking red velvet cocoa sponge paired with thick, velvety vanilla cream cheese frosting and sweet white chocolate curls.",
    price: 750,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    tags: ["Chef Special", "100% Eggless"],
    allergens: ["Gluten", "Dairy"]
  },
  {
    id: "salted-caramel-symphony",
    name: "Salted Caramel Symphony",
    description: "Buttery sponge layered with artisanal salted caramel sauce, toasted pralines, and a cloud of fluffy caramel-infused cream.",
    price: 700,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    tags: ["Trending", "100% Eggless"],
    allergens: ["Gluten", "Dairy", "Nuts"]
  },
  {
    id: "mango-cream-cloud",
    name: "Mango Cream Cloud (Seasonal)",
    description: "Light, airy vanilla sponge coupled with layers of sweet local Alfonso mango pulp and pillows of whipped fresh cream.",
    price: 680,
    category: "cakes",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    tags: ["Seasonal Choice", "100% Eggless"],
    allergens: ["Dairy", "Gluten"]
  },

  // Fresh Pastries
  {
    id: "molten-chocolate-lava",
    name: "Molten Chocolate Lava Pot",
    description: "A dark chocolate cup baked to order with an intensely rich, hot oozing chocolate center.",
    price: 120,
    category: "pastries",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    tags: ["Best Seller", "Hot & Fresh"],
    allergens: ["Dairy", "Gluten"]
  },
  {
    id: "hazelnut-mousse-pastry",
    name: "Nutty Hazelnut Mousse Slice",
    description: "Layers of roasted hazelnut praline paste, airy chocolate mousse, and a crispy wafer biscuit base.",
    price: 140,
    category: "pastries",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    tags: ["Premium", "Contain Nuts"],
    allergens: ["Nuts", "Dairy", "Gluten"]
  },
  {
    id: "blueberry-cheesecake-slice",
    name: "Blueberry Bliss Cheesecake Slices",
    description: "Decadent cream cheese baked on a crisp graham cracker crust, topped with a luscious wild blueberry glaze.",
    price: 160,
    category: "pastries",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    tags: ["New Winner"],
    allergens: ["Dairy", "Gluten"]
  },
  {
    id: "pineapple-paradise",
    name: "Classic Pineapple Paradise",
    description: "Retro favorite soft sponge packed with chopped sweet pineapples and smooth pastry cream.",
    price: 90,
    category: "pastries",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    tags: ["Nostalgic Delight"],
    allergens: ["Dairy", "Gluten"]
  },

  // Savory Bites
  {
    id: "woodfired-mini-pizza",
    name: "Gourmet Garden Mini Pizza",
    description: "Fresh pizza crust loaded with rich tomato marinara, onions, tri-color bell peppers, black olives, jalapenos, and mozzarella.",
    price: 180,
    category: "savory",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    tags: ["Freshly Baked"],
    allergens: ["Dairy", "Gluten"]
  },
  {
    id: "paneer-crunch-burger",
    name: "Paneer Crunch Stack Burger",
    description: "Crispy-fried paneer patty seasoned with spices, topped with onions, tomatoes, lettuce, and a creamy smoked-chili burger sauce.",
    price: 120,
    category: "savory",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    tags: ["Trending", "Extremely Crispy"],
    allergens: ["Gluten", "Dairy"]
  },

  // Beverages
  {
    id: "premium-cold-coffee",
    name: "Premium Coffee Frappé",
    description: "Dual-roasted Arabica espresso shot whipped and cold-blended with milk, dark chocolate chips, and premium vanilla bean ice cream.",
    price: 140,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    tags: ["Best Seller", "Incredible Refreshment"],
    allergens: ["Dairy"]
  },
  {
    id: "hazelnut-cappuccino",
    name: "Aromatic Hazelnut Cappuccino",
    description: "A steaming cup of fresh ground coffee with dense creamy milk foam and a dash of sweet hazelnut infusion.",
    price: 110,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    tags: ["Comfort Cup", "Hot"],
    allergens: ["Dairy"]
  },
  {
    id: "crimson-berry-mocktail",
    name: "Bubblegum Crimson Berry Sparkler",
    description: "A fun mocktail combining sweet strawberry syrup, wild raspberry squeeze, bubblegum essence, and cooling lime soda over crushed ice.",
    price: 120,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    tags: ["Fruity Sparkler", "Iced"]
  },
  {
    id: "virgin-mojito",
    name: "Classic Mint Virgin Mojito",
    description: "Unfiltered fresh mint leaves muddled with lime wedges, sugar syrup, and premium sparkling club soda.",
    price: 100,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    rating: 4.5,
    tags: ["Refreshing"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    authorName: "Deepak Sharma",
    rating: 5,
    text: "Ordered a custom 2-tier Red Velvet cake for my daughter's first birthday. It was absolutely stunning and 100% eggless! Every single guest loved the rich taste, and it wasn't overly sugary. The staff is extremely cooperative and handled our custom requirements perfectly.",
    date: "1 week ago",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DS&backgroundColor=a3e635"
  },
  {
    id: "rev-2",
    authorName: "Priyanka Verma",
    rating: 5,
    text: "My absolute favorite spot in Shalimar Garden for sweet cravings. Their Coffee Frappé is spectacular and Gourmet Garden Mini Pizzas are always warm, super crispy, and loaded with cheese. The cozy ambient seating makes it the perfect place to sit with friends or read. 10/10!",
    date: "2 weeks ago",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PV&backgroundColor=fbbf24"
  },
  {
    id: "rev-3",
    authorName: "Aniket Gupta",
    rating: 4,
    text: "Wonderful small cozy bakery with amazing pastries on display. I tried their Chocolate Truffle Slice and it was pure bliss. Prices are very reasonable compared to the premium quality they serve. The shop is kept very clean and hygienic.",
    date: "3 weeks ago",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AG&backgroundColor=93c5fd"
  },
  {
    id: "rev-4",
    authorName: "Meenakshi Joshi",
    rating: 5,
    text: "Excellent taste and very hygienic baking! They make customized cakes exactly how you describe or show them in pictures. Their eggless baking has set high benchmarks in Shalimar Garden. Strongly recommended to order custom anniversary cakes from here!",
    date: "1 month ago",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MJ&backgroundColor=f472b6"
  }
];
