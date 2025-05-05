import Head from "next/head";
import Link from "next/link";
import { Code, Database, TrendingUp, Compass } from "lucide-react";
import Image from "next/image";
import Layout from "@/components/Layout";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Servicios() {
  return (
    <Layout>
      <Head>
        <title>Servicios Digitales: Desarrollo Web, Datos, SEO y Estrategia | Pantom</title>
        <meta
          name="description"
          content="Soluciones digitales en desarrollo web, bases de datos, SEO y estrategia digital. Agencia de marketing y tecnología en Colombia. ¡Impulsa tu éxito con Pantom!"
        />
      </Head>
      <div className="relative min-h-screen pb-16 bg-[#0a0a0a] overflow-hidden">
        <ParticlesBackground />
        <main className="relative z-10">
          {/* Encabezado */}
          <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Nuestros servicios impulsando tu éxito digital
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              En Pantom, combinamos estrategia, diseño y tecnología para ofrecer soluciones digitales que no solo cumplen tus expectativas, sino que las superan. Exploramos tus necesidades para construir exactamente lo que tu negocio requiere en Desarrollo Web, Datos, SEO y Estrategia Digital.
            </p>
          </section>

          {/* Grid de Servicios */}
          <section className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Desarrollo Web */}
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-8 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Code className="w-10 h-10 text-[#ea5a19] mb-4" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-white mb-3">Desarrollo web a medida</h2>
                <p className="text-gray-300 mb-6">
                  Creamos experiencias web únicas, desde aplicaciones complejas hasta sitios institucionales, usando tecnologías modernas como Next.js para asegurar rendimiento y escalabilidad.
                </p>
                <Link
                  href="/servicios/desarrollo-web"
                  className="inline-flex items-center text-[#ea5a19] font-medium group-hover:underline transition-colors"
                >
                  Saber Más
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
              {/* Inteligencia de Datos */}
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-8 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Database className="w-10 h-10 text-[#ea5a19] mb-4" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-white mb-3">Inteligencia de datos y bases de datos</h2>
                <p className="text-gray-300 mb-6">
                  Transformamos tus datos en activos valiosos. Diseñamos, desarrollamos y administramos bases de datos eficientes para análisis, automatización y toma de decisiones.
                </p>
                <Link
                  href="/servicios/bases-de-datos"
                  className="inline-flex items-center text-[#ea5a19] font-medium group-hover:underline transition-colors"
                >
                  Saber Más
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
              {/* SEO */}
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-8 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <TrendingUp className="w-10 h-10 text-[#ea5a19] mb-4" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-white mb-3">Visibilidad y SEO estratégico</h2>
                <p className="text-gray-300 mb-6">
                  Aumentamos tu presencia online de forma sostenible. Implementamos estrategias SEO técnicas y de contenido para atraer tráfico cualificado y superar a tu competencia.
                </p>
                <Link
                  href="/servicios/seo"
                  className="inline-flex items-center text-[#ea5a19] font-medium group-hover:underline transition-colors"
                >
                  Saber Más
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
              {/* Estrategia Digital */}
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-8 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Compass className="w-10 h-10 text-[#ea5a19] mb-4" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-white mb-3">Consultoría en estrategia digital</h2>
                <p className="text-gray-300 mb-6">
                  Te ayudamos a navegar el panorama digital. Definimos hojas de ruta claras, evaluamos tecnologías y alineamos tus iniciativas digitales con tus objetivos de negocio.
                </p>
                <Link
                  href="/servicios/estrategia-digital"
                  className="inline-flex items-center text-[#ea5a19] font-medium group-hover:underline transition-colors"
                >
                  Saber Más
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="max-w-3xl mx-auto px-4 mt-16 text-center">
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">¿Tienes un proyecto en mente? Hablemos.</h3>
              <Link
                href="/contacto"
                className="inline-flex items-center px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg"
              >
                Agendar Consulta Estratégica
              </Link>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
} 