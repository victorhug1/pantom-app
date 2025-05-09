import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import NewsletterForm from './NewsletterForm';

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

export default function FinalCTA() {
  const [consent, setConsent] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Fondo con gradiente y patrón de puntos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Columna izquierda - CTA Principal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
            >
              ¿Listo para transformar tu presencia digital?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background transition-colors"
              >
                Agendar consulta
              </Link>
            </motion.div>
          </motion.div>

          {/* Columna derecha - Newsletter */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#1a1a1a]/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Mail className="w-6 h-6" />
            </motion.div>
            <NewsletterForm dark />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 