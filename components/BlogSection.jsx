import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Datos de ejemplo - En producción, estos vendrían de tu CMS o API
const blogPosts = [
  {
    id: 1,
    title: "Optimización de Bases de Datos: Mejores Prácticas",
    excerpt: "Descubre las técnicas más efectivas para optimizar el rendimiento de tus bases de datos y mejorar la velocidad de tu aplicación.",
    category: "Desarrollo",
    image: "/blog/database-optimization.jpg",
    slug: "/blog/optimizacion-bases-datos"
  },
  {
    id: 2,
    title: "SEO en 2024: Tendencias y Estrategias",
    excerpt: "Las últimas actualizaciones de Google y las estrategias más efectivas para mejorar tu posicionamiento en buscadores.",
    category: "SEO",
    image: "/blog/seo-trends.jpg",
    slug: "/blog/seo-2024"
  },
  {
    id: 3,
    title: "Transformación Digital: Guía Completa",
    excerpt: "Todo lo que necesitas saber para llevar tu negocio al siguiente nivel con la transformación digital.",
    category: "Marketing",
    image: "/blog/digital-transformation.jpg",
    slug: "/blog/transformacion-digital"
  },
  {
    id: 4,
    title: "Desarrollo Web: Frameworks Modernos",
    excerpt: "Análisis comparativo de los frameworks más populares y cuándo usar cada uno en tus proyectos.",
    category: "Desarrollo",
    image: "/blog/web-frameworks.jpg",
    slug: "/blog/frameworks-modernos"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function BlogSection() {
  return (
    <section className="relative py-10 overflow-hidden">
      {/* Efecto de luces naranjas en el centro */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculo central con glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.02] animate-[pulse_20s_ease-in-out_infinite]" />
        
        {/* Círculos animados más pequeños */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.015] animate-[pulse_25s_ease-in-out_infinite_reverse]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.01] animate-[pulse_30s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
          >
            Últimas Publicaciones
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Mantente al día con las últimas tendencias y mejores prácticas en desarrollo web y tecnología.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.blog-swiper-next',
              prevEl: '.blog-swiper-prev',
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {blogPosts.map((post, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  className="group h-full"
                >
                  <Link
                    href={post.slug}
                    className="block bg-[#1a1a1a]/50 border border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden rounded-xl backdrop-blur-sm"
                  >
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-medium text-primary">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 text-lg mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                        <span className="mr-2">Leer más</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="blog-swiper-prev swiper-button-prev !w-8 !h-8 !bg-white/5 hover:!bg-white/10 !rounded-full after:!text-white after:!text-sm after:!opacity-70 hover:after:!opacity-100 transition-all duration-300" />
          <div className="blog-swiper-next swiper-button-next !w-8 !h-8 !bg-white/5 hover:!bg-white/10 !rounded-full after:!text-white after:!text-sm after:!opacity-70 hover:after:!opacity-100 transition-all duration-300" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-16"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 group text-lg font-medium"
          >
            <span className="mr-2">Ver todos los artículos</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .blog-swiper {
          padding: 1rem 0.5rem;
        }
        .blog-swiper .swiper-button-next,
        .blog-swiper .swiper-button-prev {
          color: var(--primary);
        }
        .swiper-pagination-bullet {
          background: #666666 !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #fff !important;
        }
      `}</style>
    </section>
  );
} 