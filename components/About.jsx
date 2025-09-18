import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-[#1a1a1a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
            Sobre Nosotros
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            En <span className="text-white font-semibold">Pantom Digital Studio</span> combinamos estrategia, creatividad y tecnología para impulsar marcas en el entorno digital. Nos enfocamos en resultados medibles y experiencias impactantes.
          </p>
          <p className="text-gray-400">
            Nuestro equipo está formado por especialistas en SEO, contenido, UX y desarrollo web. Diseñamos soluciones personalizadas para que tu negocio destaque online.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="/about-illustration.svg"
            alt="Equipo Pantom trabajando"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
