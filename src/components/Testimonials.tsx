import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { type CarouselApi } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonialsData = [
  {
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    rating: 5,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    rating: 4,
  },
];

const Testimonials = () => {
  const { t } = useLanguage();
  const testimonials = t("testimonials.reviews", { returnObjects: true }) as { name: string; review: string }[] || [];
  const totalRating = testimonialsData.reduce(
    (acc, testimonial) => acc + testimonial.rating,
    0
  );
  const averageRating = (totalRating / testimonialsData.length).toFixed(1);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
            {t("testimonials.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-2 sm:gap-4">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold mr-3">{averageRating}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 sm:h-7 sm:w-7 ${
                      i < Math.round(parseFloat(averageRating))
                        ? "text-primary fill-primary"
                        : "text-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm sm:text-base text-muted-foreground">
              {t("testimonials.basedOn", { count: testimonials.length })}
            </span>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 group"
              >
                <div className="p-1 h-full">
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 transition-all duration-300 ease-in-out h-full flex flex-col rounded-xl overflow-hidden">
                    <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center flex-grow">
                      <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mb-6 border-4 border-primary/50">
                        <AvatarImage
                          src={testimonialsData[index].avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="text-2xl sm:text-3xl">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg sm:text-xl mb-2">
                        {testimonial.name}
                      </h3>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < testimonialsData[index].rating
                                ? "text-primary fill-primary"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base italic flex-grow">
                        "{testimonial.review}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-[-50px] text-primary hover:text-background hover:bg-primary" />
          <CarouselNext className="hidden md:flex right-[-50px] text-primary hover:text-background hover:bg-primary" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;