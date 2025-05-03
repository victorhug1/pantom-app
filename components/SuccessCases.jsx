import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

const successCases = [
  {
    id: 1,
    title: "Optimización para Firma Legal",
    description: "Desarrollo de una plataforma personalizada para automatizar procesos legales y mejorar la gestión de casos.",
    result: "+40% Eficiencia Operativa",
    image: "/cases/legal-firm.jpg",
    link: "/casos/firma-legal",
    industry: "Legal Tech"
  },
  {
    id: 2,
    title: "Plataforma E-commerce B2B",
    description: "Implementación de una solución de comercio electrónico para distribuidores mayoristas con integración de inventario.",
    result: "Reducción de Costos del 15%",
    image: "/cases/b2b-platform.jpg",
    link: "/casos/ecommerce-b2b",
    industry: "E-commerce"
  },
  {
    id: 3,
    title: "Sistema de Gestión Educativa",
    description: "Desarrollo de una plataforma integral para la gestión académica y administrativa de instituciones educativas.",
    result: "Lanzamiento Exitoso en 3 Meses",
    image: "/cases/education-system.jpg",
    link: "/casos/sistema-educativo",
    industry: "EdTech"
  }
];

export default function SuccessCases() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Casos de Éxito
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Descubre cómo hemos ayudado a empresas a alcanzar sus objetivos digitales.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {successCases.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <Link
                href={item.link}
                className="block relative overflow-hidden rounded-xl h-full bg-[#1a1a1a]/50 border border-white/10"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
                    {item.industry}
                  </span>
                  <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">{item.result}</span>
                    <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                      <span className="mr-2">Ver caso</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-16"
        >
          <Link
            href="/casos"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 group text-lg font-medium"
          >
            <span className="mr-2">Ver todos los casos</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 