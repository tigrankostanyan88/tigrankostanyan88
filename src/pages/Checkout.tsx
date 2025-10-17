import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, User, Mail, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: t("checkout.paymentSuccessTitle"),
        description: t("checkout.paymentSuccessDescription"),
      });
      clearCart();
      navigate("/");
    }, 1500);
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

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
            <span className="text-gradient-fire">{t("checkout.checkout")}</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border-2 border-primary/20 rounded-lg p-6"
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                {t("checkout.contactInformation")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t("checkout.fullName")}</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("checkout.fullNamePlaceholder")}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t("checkout.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("checkout.emailPlaceholder")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="phone">{t("checkout.phone")}</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border-2 border-primary/20 rounded-lg p-6"
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                {t("checkout.deliveryAddress")}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">{t("checkout.streetAddress")}</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder={t("checkout.streetAddressPlaceholder")}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">{t("checkout.city")}</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder={t("checkout.cityPlaceholder")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">{t("checkout.zipCode")}</Label>
                    <Input
                      id="zip"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border-2 border-primary/20 rounded-lg p-6"
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                {t("checkout.paymentInformation")}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">{t("checkout.cardNumber")}</Label>
                  <Input
                    id="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">{t("checkout.expiryDate")}</Label>
                    <Input
                      id="expiry"
                      required
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">{t("checkout.cvv")}</Label>
                    <Input
                      id="cvv"
                      required
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border-2 border-primary/20 rounded-lg p-6"
            >
              <h3 className="text-xl font-display font-bold mb-4">{t("checkout.orderSummary")}</h3>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>{t("checkout.subtotal")}</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("checkout.delivery")}</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>{t("checkout.total")}</span>
                  <span className="text-primary">
                    ${(getCartTotal() + 5).toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            <Button type="submit" variant="hero" className="w-full" size="lg">
              {t("checkout.completePayment")}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
