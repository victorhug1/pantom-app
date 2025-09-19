import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const clients = [
  {
    name: "Microgen",
    logo: "/images/clients/microgen.png",
  },
  {
    name: "Magaletta",
    logo: "/images/clients/magaletta.png",
  },
  {
    name: "Diamond Spa",
    logo: "/images/clients/diamond-spa.png",
  },
  {
    name: "Stars Branding",
    logo: "/images/clients/starsbranding.png",
  },
  {
    name: "Sanar con Bio",
    logo: "/images/clients/sanar-con-bio.png",
  },
];

export default function SuccessCases() {
  return (
    <section className="py-10 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-semibold text-gray-300">
            Casos de Éxito
          </h2>
        </motion.div>

        <div className="relative" style={{ willChange: 'transform' }}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3000}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="!py-8"
          >
            {clients.map((client, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-28 w-full grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
} 