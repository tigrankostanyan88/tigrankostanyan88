import { useState } from "react";
import { products, Product } from "@/data/products";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import ProductDetailModal from "./ProductDetailModal";

const discountedProducts: Product[] = products.filter((product) => product.discount === 50);

const DiscountedGoods = () => {
  const { addToCart, toggleFavorite, favorites } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<(Product & { stock: number; quantity: number }) | null>(null);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct({
      ...product,
      price: product.discount ? product.price - (product.price * product.discount / 100) : product.price,
      stock: 10, // Assuming a default stock
      quantity: 1,
    });
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Discounted Goods</h2>
          <p className="text-center text-muted-foreground mb-8">
            Here you will find the biggest discounts!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {discountedProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden relative group transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      - {product.discount}%
                    </div>
                  )}
                  <CardHeader className="p-0 relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => handleViewDetails(product)}
                      >
                        View Details
                      </Button>
                    </div>
                    <button
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-10"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-500"
                        }`}
                      />
                    </button>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 line-through">${product.price.toFixed(2)}</p>
                      <p className="text-primary font-bold text-xl">
                         ${(product.price - (product.price * (product.discount || 0)) / 100).toFixed(2)}
                       </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full"
                      onClick={(e) =>
                        addToCart(
                          {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            discount: product.discount,
                            image: product.image,
                            description: product.description,
                            stock: 10, // Assuming a default stock
                            quantity: 1,
                          },
                          1,
                          e
                        )
                      }
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  );
};

export default DiscountedGoods;