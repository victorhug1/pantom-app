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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-black mb-6 leading-tight"
          >
            Resultados Reales para Nuestros Clientes
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 leading-relaxed"
          >
            Nos apasiona ver cómo las soluciones digitales adecuadas generan un impacto real. 
            Aquí algunos ejemplos de los desafíos que hemos ayudado a superar.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {successCases.map((caseItem) => (
            <motion.div
              key={caseItem.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={caseItem.image}
                    alt={`Screenshot del proyecto ${caseItem.title} desarrollado por Pantom`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm font-medium text-[#ea5a19] mb-2 block">
                    {caseItem.industry}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {caseItem.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {caseItem.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#ea5a19]">
                      {caseItem.result}
                    </span>
                    <Link
                      href={caseItem.link}
                      className="inline-flex items-center text-[#ea5a19] hover:text-[#ff8f59] transition-colors duration-300 group text-sm font-medium"
                    >
                      <span className="mr-2">Ver caso completo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 