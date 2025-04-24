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
    <section className="py-24 bg-white">
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
            className="text-3xl sm:text-4xl font-bold text-black mb-6 leading-tight"
          >
            Soluciones Digitales a Medida para Impulsar tu Crecimiento
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 leading-relaxed"
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
                className="block p-8 bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col h-full relative">
                  <div className="mb-6">
                    <point.icon
                      className="w-12 h-12 text-primary group-hover:text-primary/80 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-foreground/70 flex-grow text-lg leading-relaxed">
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