import { createContext, useContext, ReactNode } from "react";
import { Heart } from "lucide-react";

interface FavoriteContextType {
  flyToFavorites: (event: React.MouseEvent<HTMLElement>) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const flyToFavorites = (event: React.MouseEvent<HTMLElement>) => {
    const favoriteIcon = document.getElementById("favorite-icon");
    const target = event.currentTarget as HTMLElement;

    if (target && favoriteIcon) {
      const targetRect = target.getBoundingClientRect();
      const favoriteIconRect = favoriteIcon.getBoundingClientRect();

      const flyingHeart = document.createElement("div");
      flyingHeart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" color="#ff0000"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      flyingHeart.style.position = "fixed";
      flyingHeart.style.left = `${targetRect.left}px`;
      flyingHeart.style.top = `${targetRect.top}px`;
      flyingHeart.style.zIndex = "1000";
      flyingHeart.style.transition = "all 1s ease-in-out";

      document.body.appendChild(flyingHeart);

      setTimeout(() => {
        flyingHeart.style.left = `${
          favoriteIconRect.left + favoriteIconRect.width / 2
        }px`;
        flyingHeart.style.top = `${
          favoriteIconRect.top + favoriteIconRect.height / 2
        }px`;
        flyingHeart.style.transform = "scale(0.5)";
        flyingHeart.style.opacity = "0";
      }, 0);

      setTimeout(() => {
        document.body.removeChild(flyingHeart);
      }, 1000);
    }
  };

  return (
    <FavoriteContext.Provider value={{ flyToFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteAnimation = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error(
      "useFavoriteAnimation must be used within a FavoriteProvider"
    );
  }
  return context;
};