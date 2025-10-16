import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartTotalWithoutDiscount } = useCart();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const totalWithoutDiscount = getCartTotalWithoutDiscount();
  const totalWithDiscount = getCartTotal();
  const discount = totalWithoutDiscount - totalWithDiscount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation onBookingOpen={() => {}} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center py-20">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8">
              Add some delicious items to get started!
            </p>
            <Link to="/menu">
              <Button variant="hero">Browse Menu</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <Navigation onBookingOpen={() => {}} />

        <section className="pt-32 pb-16 bg-gradient-ember">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4"
          >
            Shopping <span className="text-gradient-fire">Cart</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-4"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-24 h-auto sm:h-24 object-cover rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(item.image)}
                    />
                    {item.discount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute top-2 right-2"
                      >
                        - {item.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-display font-semibold text-lg mb-1">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-smooth"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <>
                          <div>
                            <span className="text-destructive font-bold text-lg">
                              ${(item.price - (item.price * item.discount) / 100).toFixed(2)}
                            </span>
                            {item.discount > 0 && (
                              <span className="text-muted-foreground line-through ml-2">
                                ${item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total: ${((item.price - (item.price * item.discount) / 100) * item.quantity).toFixed(2)}
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border-2 border-primary/20 rounded-lg p-6 h-fit lg:sticky top-24"
            >
              <h3 className="text-2xl font-display font-bold mb-6 text-gradient-fire">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total without discount</span>
                  <span className="line-through">${totalWithoutDiscount.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-destructive">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span>$5.00</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${(totalWithDiscount + 5).toFixed(2)}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <Button variant="hero" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected product"
                  className="max-w-full max-h-[90vh] rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-4 -right-4 bg-card/80 backdrop-blur-sm rounded-full p-2 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;

