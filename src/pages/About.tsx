import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Flame, Award, Users, Heart } from "lucide-react";
import aboutImage from "@/assets/about-interior.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutProps {
  onBookingOpen: () => void;
}

const About = ({ onBookingOpen }: AboutProps) => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Flame,
      title: t("about.passionTitle"),
      description: t("about.passionDescription"),
    },
    {
      icon: Award,
      title: t("about.qualityTitle"),
      description: t("about.qualityDescription"),
    },
    {
      icon: Users,
      title: t("about.teamTitle"),
      description: t("about.teamDescription"),
    },
    {
      icon: Heart,
      title: t("about.customerTitle"),
      description: t("about.customerDescription"),
    },
  ];

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
            {t("about.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("about.heroSubtitle")}
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
                {t("about.welcome")}
              </h2>
              <div className="space-y-5 text-foreground/80">
                <p>{t("about.p1")}</p>
                <p>{t("about.p2")}</p>
                <p>{t("about.p3")}</p>
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
              {t("about.valuesTitle")}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {t("about.valuesSubtitle")}
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
              {t("about.missionTitle")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              {t("about.missionP1")}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground/80">
              {t("about.missionP2")}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
