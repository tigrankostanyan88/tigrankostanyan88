import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactProps {
  onBookingOpen: () => void;
}

const Contact = ({ onBookingOpen }: ContactProps) => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.location"),
      details: "123 Premium Street, Downtown District, City 12345",
    },
    {
      icon: Phone,
      title: t("contact.phone"),
      details: "+1 (555) 123-4567",
    },
    {
      icon: Mail,
      title: t("contact.email"),
      details: "reservations@grillian.com",
    },
    {
      icon: Clock,
      title: t("contact.hours"),
      details: "Mon-Sun: 11:00 AM - 11:00 PM",
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
            {t("contact.getIn")}{" "}
            <span className="text-gradient-fire">{t("contact.touch")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("contact.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-card border-border hover:border-primary transition-smooth group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-fire flex items-center justify-center fire-glow group-hover:scale-110 transition-smooth">
                    <info.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{info.title}</h3>
                  <p className="text-muted-foreground text-sm">{info.details}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 sm:p-8 bg-card border-border">
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
                  {t("contact.sendMessageTitle")}{" "}
                  <span className="text-gradient-fire">
                    {t("contact.message")}
                  </span>
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("contact.name")}
                      </label>
                      <Input placeholder={t("contact.yourName")} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t("contact.email")}
                      </label>
                      <Input
                        type="email"
                        placeholder={t("contact.yourEmail")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("contact.phone")}
                    </label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t("contact.message")}
                    </label>
                    <Textarea
                      placeholder={t("contact.messagePlaceholder")}
                      rows={5}
                    />
                  </div>
                  <Button variant="hero" size="lg" className="w-full">
                    {t("contact.sendMessage")}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full overflow-hidden bg-card border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1558329265546!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen
                  loading="lazy"
                  title="Restaurant Location"
                />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-16 bg-gradient-ember">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
              {t("contact.readyToExperience")}{" "}
              <span className="text-gradient-fire">
                {t("contact.grillian")}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("contact.bookingSubtitle")}
            </p>
            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              {t("contact.bookNow")}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
