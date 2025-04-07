import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
            Elevamos tu marca digital
          </h1>
          <p className="text-light text-lg mt-6">
            En <span className="text-primary font-semibold">Pantom Digital Studio</span>,
            potenciamos negocios con estrategias de SEO, contenido y desarrollo web a medida.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/services"
              className="bg-primary text-black px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-white transition"
            >
              Ver Servicios
            </Link>
            <Link
              href="/contact"
              className="border border-primary text-primary px-6 py-3 rounded-2xl font-semibold hover:bg-primary hover:text-black transition"
            >
              Contáctanos
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full"
        >
          <img
            src="/business.svg"
            alt="Ilustración digital Pantom"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
