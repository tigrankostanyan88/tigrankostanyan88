import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Heart, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import ProductDetailModal from "@/components/ProductDetailModal";
import { toast } from "@/hooks/use-toast";
import { products, Product } from "@/data/products";

const categories = [
  "All",
  "Breakfasts",
  "Cold snacks",
  "Salads",
  "Soups",
  "Hot dishes",
  "Fishy",
  "Prepared on the grill",
  "Grilled",
  "Kebabs",
  "Accessories",
  "Khachapuris",
  "Pizzas",
  "Pides",
  "Combos",
];

interface MenuProps {
  onBookingOpen: () => void;
}

const Menu = ({ onBookingOpen }: MenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState<(Product & { stock: number; quantity: number }) | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addToCart, favorites, toggleFavorite, cart } = useCart();

  const filteredItems = products
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const getQuantity = (id: number) => quantities[id] || 1;
  const setQuantity = (id: number, qty: number) => {
    const item = products.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, Math.min(qty, 10)); // Assuming a default stock of 10
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
  };

  const handleAddToCart = (
    item: Product,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const qty = getQuantity(item.id);
    addToCart(
      {
        ...item,
        stock: 10, // Assuming a default stock of 10
        quantity: qty,
      },
      qty,
      event
    );
    toast({
      title: "Added to cart!",
      description: `${qty}x ${item.name}`,
    });
    setQuantity(item.id, 1);
  };

  return (
    <div className="min-h-screen">
      <Navigation onBookingOpen={onBookingOpen} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-ember">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4"
          >
            Our <span className="text-gradient-fire">Menu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our extensive selection of premium dishes, crafted with the finest ingredients
          </motion.p>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row">
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex-1 lg:pl-8">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="lg:hidden">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No items found matching your search.
                </p>
              </div>
            ) : (
              <div className="p_card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 max-[500px]:grid-cols-1 gap-3">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group bg-card border-border hover:border-primary transition-smooth flex flex-col">
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth cursor-pointer"
                          onClick={() => setSelectedProduct({ ...item, stock: 10, quantity: 1 })}
                        />
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-smooth"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              favorites.includes(item.id)
                                ? "fill-primary text-primary"
                                : "text-foreground"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-display font-semibold">
                            {item.name}
                          </h3>
                          <span className="text-primary font-bold">
                            ${item.price}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow h-10 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {item.description}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setQuantity(item.id, getQuantity(item.id) - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {getQuantity(item.id)}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              setQuantity(item.id, getQuantity(item.id) + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => handleAddToCart(item, e)}
                            disabled={
                              cart.some((cartItem) => cartItem.id === item.id)
                            }
                          >
                            {cart.some((cartItem) => cartItem.id === item.id)
                              ? "In Cart"
                              : "Add to Cart"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedProduct({ ...item, stock: 10, quantity: 1 })}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          </div>
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Menu;
