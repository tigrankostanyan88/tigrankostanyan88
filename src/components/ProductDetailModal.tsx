import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductDetailModalProps {
  product: (Product & { stock: number; quantity: number }) | null;
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, favorites, toggleFavorite } = useCart();
  const { t, language } = useLanguage();

  if (!product) return null;

  const priceNum = product.price;
  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: t(product.name),
        price: priceNum,
        discount: product.discount,
        image: product.image,
        description: t(product.description),
        stock: product.quantity,
        quantity: quantity,
      },
      quantity
    );
    toast({
      title: t("product.addedToCart"),
      description: `${quantity}x ${t(product.name)}`,
    });
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-card border-2 border-primary/20 rounded-lg max-w-3xl w-full overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-card/80 backdrop-blur-sm rounded-full p-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden group">
              <img
                src={product.image}
                alt={t(product.name)}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
              />
            </div>

            <div className="p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-display font-bold mb-2">
                    {t(product.name)}
                  </h2>
                  <p className="text-primary text-2xl font-bold">
                    ${product.price}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isFavorite ? "fill-primary text-primary" : ""
                    }`}
                  />
                </button>
              </div>

              <p className="text-muted-foreground mb-6">{t(product.description)}</p>

              <div className="mt-auto space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{t("product.quantity")}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.quantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  {t("product.addToCart")} - ${(priceNum * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
