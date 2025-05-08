import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

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
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-4"
            >
              Mantente Informado
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-6"
            >
              Suscríbete a nuestra newsletter para recibir las últimas actualizaciones, 
              consejos y tendencias en desarrollo web y tecnología.
            </motion.p>

            <motion.form
              variants={itemVariants}
              className="space-y-4"
              onSubmit={e => {
                if (!consent) {
                  e.preventDefault();
                  alert('Debes aceptar la política de privacidad.');
                }
              }}
            >
              <div>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="consent-newsletter"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  required
                  className="mr-2"
                />
                <label htmlFor="consent-newsletter" className="text-sm text-gray-300">
                  He leído y acepto la <a href="/privacidad" target="_blank" className="text-[#ea5a19] underline">política de privacidad</a> y el uso de mis datos.
                </label>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-colors"
              >
                Suscribirse
              </button>
              <p className="text-sm text-gray-400 text-center">
                Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 