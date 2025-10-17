import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Flame, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
interface NavigationProps {
  onBookingOpen: () => void;
}

const Navigation = ({ onBookingOpen }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getCartCount, getFavoritesCount } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.menu"), path: "/menu" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth bg-card/95 backdrop-blur-lg shadow-deep`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group logo-shadow">
            <Flame className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:animate-glow-pulse" />
            <span className="text-xl sm:text-2xl font-display font-bold text-gradient-fire">
              Grillian 2.0
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                id={link.name === "Favorites" ? "favorite-icon" : undefined}
                className={`relative font-medium transition-smooth hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-fire"
                  />
                )}
              </Link>
            ))}
            <Link to="/favorites" className="relative" id="favorite-icon">
              <Heart
                className={`h-6 w-6 text-foreground hover:text-primary transition-smooth ${
                  getFavoritesCount() > 0 ? "fill-primary text-primary" : ""
                }`}
              />
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getFavoritesCount()}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative" id="cart-icon">
              <ShoppingCart className="h-6 w-6 text-foreground hover:text-primary transition-smooth" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <LanguageSwitcher />
            <Button variant="hero" size="default" onClick={onBookingOpen}>
              {t("nav.book_a_table")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-smooth focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 bg-card/95 backdrop-blur-lg"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium transition-smooth hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2">
                  <Heart
                    className={`h-5 w-5 ${
                      getFavoritesCount() > 0 ? "fill-primary text-primary" : ""
                    }`}
                  />
                  <span className="font-medium">{t("nav.favorites")}</span>
                </div>
                {getFavoritesCount() > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {getFavoritesCount()}
                  </span>
                )}
              </Link>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2">
                <span className="font-medium">{t("nav.cart")}</span>
                {getCartCount() > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              <Button variant="hero" size="default" className="w-full" onClick={() => {
                setIsOpen(false);
                onBookingOpen();
              }}>
                {t("nav.book_a_table")}
              </Button>
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;