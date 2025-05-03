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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Estudio Digital Especializado en Desarrollo Web y Soluciones de Datos a Medida
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-muted-foreground"
          >
            Creamos soluciones digitales a medida: desde bases de datos optimizadas y aplicaciones web intuitivas hasta estrategias SEO que impulsan tu crecimiento.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Agendar Consulta Estratégica
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Ver Nuestros Servicios
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToNextSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to next section"
      >
        <span className="text-sm mb-2">Scroll to next section</span>
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </motion.button>
    </section>
  );
}
