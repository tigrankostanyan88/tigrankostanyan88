import { motion } from "framer-motion";
import {
  CookingPot,
  Utensils,
  GlassWater,
  Users,
  PartyPopper,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <CookingPot size={48} className="text-primary" />,
      title: t("services.exquisiteCuisine"),
      description: t("services.exquisiteCuisineDescription"),
    },
    {
      icon: <Utensils size={48} className="text-primary" />,
      title: t("services.elegantAmbiance"),
      description: t("services.elegantAmbianceDescription"),
    },
    {
      icon: <GlassWater size={48} className="text-primary" />,
      title: t("services.premiumBar"),
      description: t("services.premiumBarDescription"),
    },
    {
      icon: <Users size={48} className="text-primary" />,
      title: t("services.privateDining"),
      description: t("services.privateDiningDescription"),
    },
    {
      icon: <PartyPopper size={48} className="text-primary" />,
      title: t("services.cateringServices"),
      description: t("services.cateringServicesDescription"),
    },
  ];

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
            {t("services.title1")}
            <span className="text-gradient-fire">{t("services.title2")}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="group bg-card p-8 rounded-lg shadow-lg text-center border border-transparent hover:border-primary/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">{service.icon}</div>
              </div>
              <h3 className="text-2xl font-bold font-display mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;