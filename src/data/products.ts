export interface Product {
  id: number;
  name: { [key: string]: string };
  description: { [key: string]: string };
  price: number;
  discount: number;
  image: string;
  category: { [key: string]: string };
  isPopular?: boolean;
  stock: number;
}

export const products = [
  {
    id: 1,
    name: {
      hy: "Պրեմիում Վագյու Սթեյք",
      ru: "Премиум Вагю Стейк",
      en: "Premium Wagyu Steak"
    },
    description: {
      hy: "Համեղ վագյու սթեյք՝ կրծքային հարմարավետությամբ",
      ru: "Вкусный вагю стейк с идеальной прожаркой",
      en: "Delicious Wagyu steak with perfect tenderness"
    },
    price: 89,
    discount: 50,
    image: "/images/premium-wagyu-steak.webp",
    category: { hy: "Ամառային", ru: "Гриль", en: "Grilled" },
    isPopular: true,
    stock: 10
  },
  {
    id: 2,
    name: {
      hy: "Սիգնատուր Միքս Գրիլ",
      ru: "Сигнатур Микс Гриль",
      en: "Signature Mixed Grill"
    },
    description: {
      hy: "Բազմազան միս՝ հատուկ մարինադով",
      ru: "Разнообразное мясо с фирменным маринадом",
      en: "Variety of meats with special marinade"
    },
    price: 65,
    discount: 0,
    image: "/images/signature-mixed-grill.webp",
    category: { hy: "Մարինացված Գրիլ", ru: "Приготовлено на гриле", en: "Prepared on the grill" },
    isPopular: true,
    stock: 15
  },
  {
    id: 3,
    name: {
      hy: "Խոզի Գառի Խաշած Հատիկներ",
      ru: "Бараньи отбивные Royale",
      en: "Lamb Chops Royale"
    },
    description: {
      hy: "Անպարտելի բարձիկներ՝ հոտավետ սոուսով",
      ru: "Нежные отбивные с ароматным соусом",
      en: "Tender chops with flavorful sauce"
    },
    price: 55,
    discount: 0,
    image: "/images/lamb-chops-royale.webp",
    category: { hy: "Ժմռոտ ճաշատեսակներ", ru: "Горячие блюда", en: "Hot dishes" },
    stock: 20
  },
  {
    id: 4,
    name: {
      hy: "Կլասիկ Չիզբուրգեր",
      ru: "Классический Чизбургер",
      en: "Classic Cheeseburger"
    },
    description: {
      hy: "Համեղ բուրգեր՝ քաղցր պանիրով",
      ru: "Вкусный бургер с плавленым сыром",
      en: "Delicious burger with melted cheese"
    },
    price: 25,
    discount: 50,
    image: "/images/classic-cheeseburger.webp",
    category: { hy: "Ժմռոտ ճաշատեսակներ", ru: "Горячие блюда", en: "Hot dishes" },
    isPopular: true,
    stock: 30
  },
  {
    id: 5,
    name: {
      hy: "Գրիլ Սաղմոն",
      ru: "Лосось на гриле",
      en: "Grilled Salmon"
    },
    description: {
      hy: "Թարմ սաղմոն՝ խառը մարինադով",
      ru: "Свежий лосось с маринадом",
      en: "Fresh salmon with marinade"
    },
    price: 35,
    discount: 0,
    image: "/images/grilled-salmon.webp",
    category: { hy: "Ջրային", ru: "Рыбные", en: "Fishy" },
    stock: 25
  },
  {
    id: 6,
    name: {
      hy: "BBQ Խոզի Միս",
      ru: "BBQ Рёбрышки",
      en: "BBQ Ribs"
    },
    description: {
      hy: "Խոզի միս՝ համեղ BBQ սոուսով",
      ru: "Свинина с вкусным BBQ соусом",
      en: "Pork ribs with tasty BBQ sauce"
    },
    price: 45,
    discount: 0,
    image: "/images/bbq-ribs.webp",
    category: { hy: "Մարինացված Գրիլ", ru: "Приготовлено на гриле", en: "Prepared on the grill" },
    stock: 18
  },
  {
    id: 7,
    name: {
      hy: "Կեսար Սալաթ",
      ru: "Салат Цезарь",
      en: "Caesar Salad"
    },
    description: {
      hy: "Թարմ կանաչիներ՝ դասական սոուսով",
      ru: "Свежие овощи с классическим соусом",
      en: "Fresh greens with classic dressing"
    },
    price: 15,
    discount: 0,
    image: "/images/caesar-salad.jpg",
    category: { hy: "Սալաթներ", ru: "Салаты", en: "Salads" },
    stock: 50
  },
  {
    id: 8,
    name: {
      hy: "Սնկի Սոուս",
      ru: "Грибной суп",
      en: "Mushroom Soup"
    },
    description: {
      hy: "Համեղ սնկով սոուս",
      ru: "Вкусный грибной суп",
      en: "Delicious mushroom soup"
    },
    price: 12,
    discount: 0,
    image: "/images/mushroom-soup.jpg",
    category: { hy: "Սոուսներ", ru: "Супы", en: "Soups" },
    stock: 40
  },
  {
    id: 9,
    name: {
      hy: "Կարբոնարա Պաստա",
      ru: "Паста Карбонара",
      en: "Carbonara Pasta"
    },
    description: {
      hy: "Դասական իտալական պաստան՝ կրեմային սոուսով, խրթխրթան բեկոնով",
      ru: "Классическая итальянская паста с кремовым соусом и беконом",
      en: "Classic Italian pasta with creamy sauce and crispy bacon"
    },
    price: 18,
    discount: 10,
    image: "/images/carbonara-pasta.jpg",
    category: { hy: "Պաստա", ru: "Паста", en: "Pasta" },
    stock: 35
  }
];
