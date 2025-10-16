import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { menuItems } from "./Menu";

const Favorites = () => {
  const { favorites, toggleFavorite, addToCart, cart } = useCart();
  const favoriteItems = menuItems.filter((item) => favorites.includes(item.id));

  return (
    <div className="min-h-screen">
      <Navigation onBookingOpen={() => {}} />

      <section className="pt-32 pb-16 bg-gradient-ember">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4"
          >
            Your <span className="text-gradient-fire">Favorites</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">No Favorites Yet</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Start adding items to your favorites!
              </p>
              <Link to="/menu">
                <Button variant="hero">Browse Menu</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group bg-card border-border hover:border-primary transition-smooth">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                      />
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm p-2 rounded-full"
                      >
                        <Heart className="h-5 w-5 fill-primary text-primary" />
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-display font-semibold">
                          {item.name}
                        </h3>
                        <span className="text-primary font-bold">{item.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        {item.description}
                      </p>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={(e) =>
                          addToCart(
                            {
                              id: item.id,
                              name: item.name,
                              price: parseFloat(item.price.replace("$", "")),
                              image: item.image,
                              description: item.description,
                              stock: item.quantity,
                              quantity: 1,
                            },
                            1,
                            e
                          )
                        }
                          disabled={
                            cart.some((cartItem) => cartItem.id === item.id) ||
                            !item.in_stock
                          }
                        >
                          {!item.in_stock
                            ? "Out of Stock"
                            : cart.some((cartItem) => cartItem.id === item.id)
                            ? "In Cart"
                            : "Add to Cart"}
                        </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
