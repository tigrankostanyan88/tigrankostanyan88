import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
          {/* Brand and Socials */}
          <div className="flex flex-col items-center sm:items-start">
            <a className="flex items-center gap-2 group mb-6" href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-flame h-8 w-8 text-primary group-hover:animate-glow-pulse"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
              <span className="text-2xl font-display font-bold text-gradient-fire">
                Grillian 2.0
              </span>
            </a>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6 text-white">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">{t("footer.home")}</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-primary transition-colors">{t("footer.menu")}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">{t("footer.contact")}</Link></li>
              <li><Link to="/favorites" className="text-gray-400 hover:text-primary transition-colors">{t("footer.favorites")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6 text-white">{t("footer.contactUs")}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="mx-auto sm:mx-0">{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="mx-auto sm:mx-0">{t("footer.email")}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="mx-auto sm:mx-0">{t("footer.phone")}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-xl font-bold mb-6 text-white">{t("footer.newsletter")}</h3>
            <p className="text-sm text-gray-400 mb-4">
              {t("footer.newsletterSubtitle")}
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder={t("footer.yourEmail")} className="bg-gray-800 border-gray-700 text-white focus:ring-primary" />
              <Button type="submit" variant="default">{t("footer.subscribe")}</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};
