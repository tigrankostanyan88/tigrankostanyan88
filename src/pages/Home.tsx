import { useRef } from "react";
import Hero from "@/components/Hero";
import FeaturedDishes from "@/components/FeaturedDishes";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HomeProps {
  onBookingOpen: () => void;
}

const Home = ({ onBookingOpen }: HomeProps) => {
  const featuredRef = useRef<HTMLDivElement>(null);

  const handleScrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollClick={handleScrollToFeatured} onBookingOpen={onBookingOpen} />
      <div ref={featuredRef}>
        <FeaturedDishes />
      </div>
      <Gallery />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-ember">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              Reserve Your <span className="text-gradient-fire">Table Today</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the finest in premium grilling and exceptional service.
              Book your table now for an unforgettable evening.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={onBookingOpen} className="w-full sm:w-auto">
                Book a Table
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Call Us Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
