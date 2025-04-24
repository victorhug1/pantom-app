import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import SuccessCases from "../components/SuccessCases";
import { Search, BarChart3, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { locale } = router;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pantom Digital Studio",
    "url": "https://pantom.digital",
    "description": "Estudio digital especializado en transformación digital, marketing y desarrollo web. Ayudamos a empresas a crecer en el mundo digital.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pantom.digital/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pantom Digital Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pantom.digital/logo.png"
      }
    }
  };

  return (
    <>
      <SEO
        title="Pantom Digital Studio | Transformación Digital y Marketing"
        description="Somos un estudio digital especializado en transformación digital, marketing y desarrollo web. Ayudamos a empresas a crecer en el mundo digital."
        ogImage="/og-image.jpg"
        ogUrl="https://pantom.digital"
        canonicalUrl="https://pantom.digital"
        type="website"
        locale={locale === 'es' ? 'es_ES' : 'en_US'}
        alternateLocales={locale === 'es' ? ['en_US'] : ['es_ES']}
        structuredData={structuredData}
      />
      <Layout>
        <Head>
          <title>Pantom Digital Studio</title>
          <meta name="description" content="Estudio digital especializado en SEO, marketing digital y desarrollo web. Elevamos tu marca en el entorno online." />
          <link rel="icon" href="/pantom_logo.svg" />
        </Head> 
        <Hero />
        <Introduction />
        <SuccessCases />

        <section className="bg-dark text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-light text-lg">
              Soluciones digitales enfocadas en resultados.
            </p>
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
    </>
  );
}
