import { motion } from "framer-motion";
import { ArrowRight, Search, Code, Rocket, BarChart, Users } from "lucide-react";

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

const steps = [
  {
    icon: Search,
    title: "Análisis y Estrategia",
    description: "Realizamos un análisis profundo de tu negocio, competencia y mercado para desarrollar una estrategia digital personalizada que maximice tu ROI."
  },
  {
    icon: Code,
    title: "Diseño y Desarrollo",
    description: "Creamos soluciones digitales a medida, desde sitios web hasta aplicaciones, utilizando las últimas tecnologías y mejores prácticas de UX/UI."
  },
  {
    icon: Rocket,
    title: "Implementación",
    description: "Desplegamos tu proyecto con los más altos estándares de calidad, asegurando un rendimiento óptimo y una experiencia de usuario excepcional."
  },
  {
    icon: BarChart,
    title: "Optimización",
    description: "Monitoreamos y optimizamos continuamente tu presencia digital, realizando ajustes basados en datos para mejorar constantemente los resultados."
  },
  {
    icon: Users,
    title: "Soporte y Mantenimiento",
    description: "Ofrecemos soporte técnico continuo y mantenimiento proactivo para garantizar que tu solución digital siempre esté actualizada y funcionando perfectamente."
  }
];

export default function Process() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Efecto de luces naranjas en el centro */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculo central con glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.02] animate-[pulse_20s_ease-in-out_infinite]" />
        
        {/* Círculos animados más pequeños */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.015] animate-[pulse_25s_ease-in-out_infinite_reverse]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.01] animate-[pulse_30s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Nuestro Proceso de Trabajo
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Un enfoque sistemático y probado para garantizar el éxito de tu proyecto digital
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-[#1a1a1a]/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-[#1a1a1a]/70 transition-colors ${
                index >= 3 ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 