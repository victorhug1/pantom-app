import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Code2, 
  Database, 
  Search, 
  Users, 
  ArrowRight 
} from "lucide-react";

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

const servicePoints = [
  {
    title: "Desarrollo Web a Medida",
    description: "Creamos aplicaciones y sitios web rápidos, intuitivos y escalables (especialmente con Next.js) diseñados específicamente para tus procesos y usuarios.",
    icon: Code2,
    link: "/servicios/desarrollo-web"
  },
  {
    title: "Inteligencia de Datos",
    description: "Optimizamos y administramos tus bases de datos para extraer información valiosa, automatizar tareas y potenciar tus decisiones estratégicas.",
    icon: Database,
    link: "/servicios/bases-de-datos"
  },
  {
    title: "Estrategia y Visibilidad SEO",
    description: "Diseñamos estrategias digitales claras y ejecutamos acciones SEO efectivas para aumentar tu visibilidad online y atraer clientes potenciales.",
    icon: Search,
    link: "/servicios/seo"
  },
  {
    title: "Enfoque Colaborativo",
    description: "Trabajamos como una extensión de tu equipo, con comunicación directa y un compromiso total para asegurar el éxito de tu proyecto.",
    icon: Users,
    link: "/nosotros"
  }
];

export default function Introduction() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Fondo con gradiente oscuro */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-[#0a0a0a] to-[#000000]" />
      
      {/* Patrón de cuadrícula y puntos con fade out */}
      <div className="absolute inset-0">
        {/* Grid lines con fade out */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] opacity-[0.05]" />
        
        {/* Dots pattern con fade out */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:linear-gradient(to_bottom,black_0%,black_50%,transparent_100%)] opacity-[0.03]" />
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
            Tecnología estratégica para tu crecimiento digital
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Como tu estudio digital dedicado, colaboramos estrechamente para entender tus desafíos y construir la tecnología precisa que necesitas, desde la optimización de datos hasta la experiencia web perfecta.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {servicePoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <Link
                href={point.link}
                className="block p-8 bg-[#1a1a1a]/50 border border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden rounded-xl backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col h-full relative">
                  <div className="mb-6">
                    <point.icon
                      className="w-12 h-12 text-primary group-hover:text-primary/80 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-gray-300 flex-grow text-lg leading-relaxed">
                    {point.description}
                  </p>
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
            href="/nosotros"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300 group text-lg font-medium"
          >
            <span className="mr-2">Conoce nuestra metodología</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 