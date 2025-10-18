import { useRef } from "react";
import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import { StoriesSection as Stories } from "@/components/Stories";
import MostPopular from "@/components/MostPopular";
import DiscountedGoods from "@/components/DiscountedGoods";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeProps {
  onBookingOpen: () => void;
}

const Home = ({ onBookingOpen }: HomeProps) => {
  const featuredRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleScrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollClick={handleScrollToFeatured} onBookingOpen={onBookingOpen} />
      <Stories />
      <div ref={featuredRef}>
        <FeaturedDishes />
      </div>
      <MostPopular />
      <DiscountedGoods />
      <Gallery />
      <Testimonials />
      <Services />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-ember">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              {t("home.cta.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={onBookingOpen} className="w-full sm:w-auto">
                {t("home.cta.bookButton")}
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t("home.cta.callButton")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
