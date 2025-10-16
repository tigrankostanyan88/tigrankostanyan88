import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { products, Product } from "@/data/products";

const FeaturedDishes = () => {
  const { addToCart, cart } = useCart();
  const signatureDishes = products.filter(
    (product) => product.category === "signature"
  );

  const handleAddToCart = (
    dish: Product,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    addToCart(
      {
        ...dish,
        stock: 10,
        quantity: 1,
        discount: dish.discount,
      },
      1,
      event
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gradient-fire">Signature Dishes</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Indulge in our chef's carefully crafted selection of premium grilled delicacies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="overflow-hidden group cursor-pointer bg-card border-border hover:border-primary transition-smooth">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  {dish.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      - {dish.discount}%
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-display font-semibold">
                      {dish.name}
                    </h3>
                    <div className="text-right">
                      <>
                        <span className="text-destructive font-bold text-lg">
                          ${(dish.price - (dish.price * dish.discount) / 100).toFixed(2)}
                        </span>
                        {dish.discount > 0 && (
                          <span className="text-muted-foreground line-through ml-2">
                            ${dish.price.toFixed(2)}
                          </span>
                        )}
                      </>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {dish.description}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => handleAddToCart(dish, e)}
                    disabled={cart.some((item) => item.id === dish.id)}
                  >
                    {cart.some((item) => item.id === dish.id)
                      ? "In Cart"
                      : "Add to Cart"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link to="/menu">
            <Button variant="hero" size="lg">
              View Full Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
