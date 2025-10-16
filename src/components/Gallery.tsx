import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const galleryImages = [
  {
    src: "https://images.squarespace-cdn.com/content/v1/62a1090272e54543cc89628b/13e5c0d4-fcd0-4a89-a863-5834c3202837/Mountainview+CJRW+talent+OFC+2017-11KSJ_8661ps.jpg",
  },
  {
    src: "https://www.partstown.com/about-us/wp-content/uploads/2019/10/Friends-Dining-Together-6-Ways-to-Enhance-Customer-Experience-in-Your-Restaurant.png",
  },
  {
    src: "https://cdn.prod.website-files.com/5fb894860e4980731e5af152/688005b72f6c2bd5c5a39b1c_2025_Push_How%20Gen%20Z%20Food%20Preferences%20Are%20Reshaping%20the%20Restaurant%20Industry_Cover.webp",
  },
  {
    src: "https://brizodata.com/wp-content/uploads/2023/11/Image-022-scaled-1-1024x576.jpeg",
  },
  {
    src: "https://business.yelp.com/wp-content/uploads/2025/03/yelp-for-restaurants-home.webp",
  },
  {
    src: "https://www.indystar.com/gcdn/presto/2021/10/08/PIND/00cf0fad-0136-483e-b076-35ec7ba6f93f-WineMarket_GH10072021_021.jpg?crop=5999,3375,x0,y200&width=1733&height=975&format=pjpg&auto=webp",
  },
  {
    src: "https://wp-otstatic.opentable.com/uploads/sites/340/2024/11/27394e001e99a9a237e035773cb51f3c.webp",
  },
  { src: "https://sadafencino.com/Gallery/News/NewsImages/30.jpg" },
  {
    src: "https://visitnyc.com/wp-content/uploads/2024/06/young-people-having-dinner-in-the-restaurant-2023-11-27-05-22-35-utc.jpg",
  },
  {
    src: "https://www.yourcitywithin.com/wp-content/uploads/2025/02/Winterlicious2025-Downtown-YCW2025-scaled.jpg",
  },
  {
    src: "https://torontolife.mblycdn.com/tl/resized/2024/08/w1280/Dispatch-Fall-Menu-45-of-123.jpg",
  },
  {
    src: "https://i2-prod.dublinlive.ie/incoming/article15677546.ece/ALTERNATES/s1200d/0_Couple-dining-out.png",
  },
  {
    src: "https://offloadmedia.feverup.com/secretdublin.com/wp-content/uploads/2025/07/16150111/6_j0qedz-compressed_height_1080-960x559.jpg",
  },
  {
    src: "https://static.mycity.travel/manage/uploads/6/33/715126/1/degustation-de-vin-cellier-du-chalet-royalp-hotel-spa.jpg",
  },
  {
    src: "https://symphony.cdn.tambourine.com/the-drifthaven-at-gearhart/media/istock-1155378553-653acb264c475.jpg",
  },
  {
    src: "https://b.zmtcdn.com/data/collections/fed6cfe1996545351e00158eaed6f2f5_1675232670.jpg?fit=around|562.5:360&crop=562.5:360;*,*",
  },
  {
    src: "https://dt4l9bx31tioh.cloudfront.net/eazymedia/eazytrendz/2215/trend20190117112347.jpg?width=750&height=436&mode=crop",
  },
  {
    src: "https://img.ctykit.com/cdn/tx-sugar-land/images/tr:w-1800/2v5a4484.jpg",
  },
  {
    src: "https://tourismguideafrica.com/wp-content/uploads/2023/12/restaurants-in-Vilakazie-Street-1.jpg",
  },
  {
    src: "https://tourismguideafrica.com/wp-content/uploads/2023/12/restaurants-in-Vilakazie-Street-1.jpg",
  },
];

const gradientClasses = ["bg-gradient-fire", "bg-gradient-bronze", "bg-gradient-ember"];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-gradient-fire">Gallery</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            A glimpse into our world
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {galleryImages.map((image, idx) => {
            const gradientClass =
              gradientClasses[idx % gradientClasses.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                }}
                onClick={() => {
                  setOpen(true);
                  setIndex(idx);
                }}
              >
                <div
                  className={`overflow-hidden rounded-lg cursor-pointer ${gradientClass} p-1`}
                >
                  <img
                    className="h-56 w-full object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
                    src={image.src}
                    alt={`Gallery image ${idx + 1}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={galleryImages}
          index={index}
        />
      </div>
    </section>
  );
};

export default Gallery;



