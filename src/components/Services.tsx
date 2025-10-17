import { motion } from "framer-motion";
import {
  CookingPot,
  Utensils,
  GlassWater,
  Users,
  PartyPopper,
} from "lucide-react";

const services = [
  {
    icon: <CookingPot size={48} className="text-primary" />,
    title: "Exquisite Cuisine",
    description: "Our menu features a curated selection of the finest grilled dishes, prepared with locally-sourced ingredients and a passion for flavor.",
  },
  {
    icon: <Utensils size={48} className="text-primary" />,
    title: "Elegant Ambiance",
    description: "Dine in a sophisticated and comfortable atmosphere, perfect for romantic dinners, family gatherings, or corporate events.",
  },
  {
    icon: <GlassWater size={48} className="text-primary" />,
    title: "Premium Bar",
    description: "Complement your meal with our extensive selection of fine wines, craft cocktails, and premium spirits from around the world.",
  },
  {
    icon: <Users size={48} className="text-primary" />,
    title: "Private Dining",
    description: "Host your special occasions in our exclusive private dining rooms, with personalized menus and dedicated service.",
  },
  {
    icon: <PartyPopper size={48} className="text-primary" />,
    title: "Catering Services",
    description: "Bring the Grillian experience to your event with our bespoke catering services, tailored to meet your needs.",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-gradient-fire">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            At Grillian, we are dedicated to providing an exceptional dining experience with a focus on quality, ambiance, and service.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              className="group bg-card p-8 rounded-lg shadow-lg text-center border border-transparent hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">{service.icon}</div>
              </div>
              <h3 className="text-2xl font-bold font-display mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;