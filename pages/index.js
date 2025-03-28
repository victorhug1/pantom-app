import Layout from "../components/Layout";
import { Search, BarChart3, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      <section className="bg-dark text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">Nuestros Servicios</h2>
          <p className="text-light text-lg">Soluciones digitales enfocadas en resultados.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* SEO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#222] p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center mb-4">
              <Search size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">SEO</h3>
            <p className="text-sm text-center text-gray-300">
              Posicionamos tu sitio en Google de forma orgánica con estrategias de contenido, técnica y autoridad.
            </p>
          </motion.div>

          {/* Marketing Digital */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#222] p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center mb-4">
              <BarChart3 size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Marketing Digital</h3>
            <p className="text-sm text-center text-gray-300">
              Creamos campañas personalizadas en redes sociales, email y anuncios para atraer y convertir clientes.
            </p>
          </motion.div>

          {/* Desarrollo Web */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#222] p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center mb-4">
              <Code2 size={40} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Desarrollo Web</h3>
            <p className="text-sm text-center text-gray-300">
              Diseñamos y desarrollamos sitios rápidos, responsivos y enfocados en experiencia de usuario.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
