import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Flame, Award, Users, Heart } from "lucide-react";
import aboutImage from "@/assets/about-interior.jpg";

const values = [
  {
    icon: Flame,
    title: "Passion for Perfection",
    description: "Every dish is crafted with meticulous attention to detail and love for the art of grilling",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "We source only the finest ingredients from trusted suppliers around the world",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our chefs bring decades of experience from Michelin-starred kitchens",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction and experience is at the heart of everything we do",
  },
];

interface AboutProps {
  onBookingOpen: () => void;
}

const About = ({ onBookingOpen }: AboutProps) => {
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
            Our <span className="text-gradient-fire">Story</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A journey of passion, excellence, and the pursuit of culinary perfection
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section
        className="py-24 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${aboutImage})` }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:block" />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-background/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
                Welcome to <span className="text-gradient-fire">Grillian 2.0</span>
              </h2>
              <div className="space-y-5 text-foreground/80">
                <p>
                  Founded in 2015, Grillian has been redefining the art of premium grilling
                  and fine dining. Our journey began with a simple vision: to create an
                  extraordinary culinary experience that combines traditional grilling
                  techniques with modern innovation.
                </p>
                <p>
                  Today, Grillian 2.0 represents the evolution of that vision. We've
                  elevated every aspect of our restaurant—from our carefully curated menu
                  to our stunning ambiance—to deliver an unparalleled dining experience.
                </p>
                <p>
                  Our commitment to excellence extends beyond the plate. We believe in
                  sustainable sourcing, supporting local farmers, and creating a warm,
                  welcoming atmosphere where every guest feels like family.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="text-gradient-fire">Values</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              The principles that guide us every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="p-8 text-center h-full bg-card/50 border-border/50 hover:border-primary hover:bg-card/80 transition-all duration-300 group">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-fire flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_theme(colors.primary.DEFAULT)]">
                    <value.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6">
              Our <span className="text-gradient-fire">Mission</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              To create unforgettable dining experiences through exceptional food,
              impeccable service, and a passion for culinary excellence.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground/80">
              We strive to be more than just a restaurant—we aim to be a destination
              where memories are made, celebrations come to life, and every visit
              leaves a lasting impression.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
