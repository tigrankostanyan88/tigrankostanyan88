export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wagyu Steak",
    description: "A5 grade Japanese Wagyu, perfectly grilled to your preference",
    price: 89,
    discount: 50,
    image: "/images/premium-wagyu-steak.webp",
    category: "Grilled",
  },
  {
    id: 2,
    name: "Signature Mixed Grill",
    description: "Chef's selection of finest cuts, served with seasonal vegetables",
    price: 65,
    discount: 0,
    image: "/images/signature-mixed-grill.webp",
    category: "Prepared on the grill",
  },
  {
    id: 3,
    name: "Lamb Chops Royale",
    description: "Tender lamb chops with rosemary and garlic butter",
    price: 55,
    discount: 0,
    image: "/images/lamb-chops-royale.webp",
    category: "Hot dishes",
  },
  {
    id: 4,
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with cheddar cheese, lettuce, and tomato",
    price: 25,
    discount: 50,
    image: "/images/classic-cheeseburger.webp",
    category: "Hot dishes",
  },
  {
    id: 5,
    name: "Grilled Salmon",
    description: "Fresh salmon fillet with a lemon-dill sauce",
    price: 35,
    discount: 0,
    image: "/images/grilled-salmon.webp",
    category: "Fishy",
  },
  {
    id: 6,
    name: "BBQ Ribs",
    description: "Slow-cooked pork ribs with a smoky BBQ sauce",
    price: 45,
    discount: 0,
    image: "/images/bbq-ribs.webp",
    category: "Prepared on the grill",
  },
  {
    id: 7,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
    price: 15,
    discount: 0,
    image: "/images/caesar-salad.jpg",
    category: "Salads",
  },
  {
    id: 8,
    name: "Mushroom Soup",
    description: "Creamy soup with a mix of wild mushrooms.",
    price: 12,
    discount: 0,
    image: "/images/mushroom-soup.jpg",
    category: "Soups",
  },
];