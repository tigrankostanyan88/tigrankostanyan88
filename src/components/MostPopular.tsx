import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Eye, ShoppingCart } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';
import { products, Product } from '@/data/products';

const MostPopular: React.FC = () => {
  const { addToCart, cart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product & { stock: number; quantity: number } | null>(null);
  const popularDishes = products.filter(
    (product) => product.category === "popular"
  );

  const handleAddToCart = (
    dish: Product,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    addToCart(
      {
        ...dish,
        stock: 10, // Assuming a default stock
        quantity: 1,
      },
      1,
      event
    );
  };

  const handleViewDetails = (
    dish: Product,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    setSelectedProduct({ ...dish, stock: 10, quantity: 1 });
  };

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our Most <span className="text-gradient-fire">Popular</span> Dishes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the dishes that our customers love the most.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDishes.map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={(e) => handleViewDetails(dish, e)}
              >
                <div className="relative">
                  <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => handleViewDetails(dish, e)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold font-display">{dish.name}</h3>
                      <span className="text-primary font-bold text-xl">${dish.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{dish.description}</p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={(e) => handleAddToCart(dish, e)}
                    disabled={cart.some((item) => item.id === dish.id)}
                  >
                    {cart.some((item) => item.id === dish.id) ? (
                      "In Cart"
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default MostPopular;