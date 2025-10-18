import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useFavoriteAnimation } from "./FavoriteContext";
import { products } from "@/data/products";
import { useProducts } from "./ProductContext";
import { useLanguage } from "./LanguageContext";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  favorites: number[];
  addToCart: (
    item: {
      id: number;
      name: string;
      price: number;
      discount: number;
      stock: number;
      image: string;
      description: string;
      quantity: number;
    },
    quantity: number,
    event?: React.MouseEvent<HTMLElement>
  ) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: number, event?: React.MouseEvent<HTMLElement>) => void;
  getCartTotal: () => number;
  getCartTotalWithoutDiscount: () => number;
  getCartCount: () => number;
  getFavoritesCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { flyToFavorites } = useFavoriteAnimation();
  const { t } = useLanguage();
  const { products: allProducts } = useProducts();

  useEffect(() => {
    const savedCart = localStorage.getItem("shop_cart_v1");
    const savedFavorites = localStorage.getItem("shop_favorites_v1");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as number[];
      const productIds = products.map((p) => p.id);
      const validFavorites = favoriteIds.filter((id) => productIds.includes(id));
      setFavorites(validFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shop_cart_v1", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shop_favorites_v1", JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (
    item: {
      id: number;
      name: string;
      price: number;
      discount: number;
      stock: number;
      image: string;
      description: string;
      quantity: number;
    },
    quantity: number,
    event?: React.MouseEvent<HTMLElement>
  ) => {
    if (event) {
      const cartIcon = document.getElementById("cart-icon");
      const target = event.currentTarget as HTMLElement;
      const dishImage = target.closest(".group")?.querySelector("img");

      if (dishImage && cartIcon) {
        const dishImageRect = dishImage.getBoundingClientRect();
        const cartIconRect = cartIcon.getBoundingClientRect();

        const flyingImage = dishImage.cloneNode(true) as HTMLImageElement;
        flyingImage.style.position = "fixed";
        flyingImage.style.left = `${dishImageRect.left}px`;
        flyingImage.style.top = `${dishImageRect.top}px`;
        flyingImage.style.width = `${dishImageRect.width}px`;
        flyingImage.style.height = `${dishImageRect.height}px`;
        flyingImage.style.zIndex = "1000";
        flyingImage.style.transition = "all 1s ease-in-out";
        flyingImage.style.borderRadius = "15px";
        flyingImage.style.objectFit = "cover";

        document.body.appendChild(flyingImage);

        setTimeout(() => {
          flyingImage.style.left = `${
            cartIconRect.left + cartIconRect.width / 2
          }px`;
          flyingImage.style.top = `${
            cartIconRect.top + cartIconRect.height / 2
          }px`;
          flyingImage.style.width = "0px";
          flyingImage.style.height = "0px";
          flyingImage.style.opacity = "0";
        }, 0);

        setTimeout(() => {
          document.body.removeChild(flyingImage);
          setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
              return prev.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              );
            }
            return [...prev, { id: item.id, quantity }];
          });
        }, 1000);
      }
    } else {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { id: item.id, quantity }];
      });
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (quantity <= 0) {
            removeFromCart(id);
            return item;
          }
          const product = allProducts.find((p) => p.id === id);
          const stock = product ? product.stock : 0;
          const newQuantity = Math.min(quantity, stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (
    id: number,
    event?: React.MouseEvent<HTMLElement>
  ) => {
    if (event && !favorites.includes(id)) {
      flyToFavorites(event);
    }
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      const product = allProducts.find((p) => p.id === cartItem.id);
      if (!product) return total;
      const price = product.price - (product.price * product.discount) / 100;
      return total + price * cartItem.quantity;
    }, 0);
  };

  const getCartTotalWithoutDiscount = () => {
    return cart.reduce((total, cartItem) => {
      const product = allProducts.find((p) => p.id === cartItem.id);
      if (!product) return total;
      return total + product.price * cartItem.quantity;
    }, 0);
  };

  const getCartCount = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  const getFavoritesCount = () => favorites.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        getCartTotal,
        getCartTotalWithoutDiscount,
        getCartCount,
        getFavoritesCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
