import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

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

export default function Hero() {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-[85vh] landscape:min-h-[100vh] w-full overflow-hidden flex flex-col items-center justify-start pt-24 sm:pt-32 md:pt-24 landscape:pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/background_pantom.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* Base overlay */}
        <div className="absolute inset-0 bg-background opacity-90" />
        
        {/* Tech pattern overlay */}
        <div className="absolute inset-0">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-[0.15]" />
          
          {/* Dots pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.1]" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-50" />
          
          {/* Animated circles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] opacity-20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] opacity-20 animate-[spin_20s_linear_infinite_reverse]" />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center mt-4 sm:mt-0 landscape:mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-5xl landscape:text-2xl font-bold text-foreground mb-6 landscape:mb-4 leading-tight text-center"
          >
            Estudio Digital Especializado en Desarrollo Web y Soluciones de Datos a Medida
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg landscape:text-base text-foreground/80 mb-10 landscape:mb-8 max-w-2xl mx-auto leading-relaxed text-center"
          >
            Creamos soluciones digitales a medida: desde bases de datos optimizadas y aplicaciones web intuitivas hasta estrategias SEO que impulsan tu crecimiento.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col landscape:flex-row w-full gap-4 justify-center items-center"
          >
            <Link
              href="/contacto"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 landscape:py-3 text-lg font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Agendar Consulta Estratégica
            </Link>
            <Link
              href="/servicios"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 landscape:py-3 text-lg font-medium text-foreground border-2 border-foreground rounded-lg hover:bg-foreground/10 transition-colors duration-300"
            >
              Ver Nuestros Servicios
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-4 md:bottom-6 landscape:bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <div className="w-6 h-10 sm:w-8 sm:h-12 md:w-10 md:h-16 landscape:w-8 landscape:h-8 border-2 border-foreground/30 rounded-full flex justify-center p-1 group-hover:border-foreground/60 transition-colors">
          <motion.div
            animate={{
              y: [0, 6, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="w-1 h-1 bg-foreground rounded-full"
          />
        </div>
        <ChevronDown 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground/30 group-hover:text-foreground/60 transition-colors"
          size={16}
        />
      </motion.button>
    </section>
  );
}
