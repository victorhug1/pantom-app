import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import BreadcrumbsJsonLd from "@/components/SEO/BreadcrumbsJsonLd";
import ServiceJsonLd from "@/components/SEO/ServiceJsonLd";
import {
  Search,
  ListChecks,
  KeyRound,
  FileText,
  Settings2,
  Link2,
  MapPin,
  BarChart2,
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";

export default function Seo() {
  return (
    <Layout>
      <BreadcrumbsJsonLd items={[
        { name: 'Inicio', url: '/' },
        { name: 'Servicios', url: '/servicios' },
        { name: 'SEO Estratégico', url: '/servicios/seo' },
      ]} />
      <ServiceJsonLd 
        name="Estrategia y Visibilidad SEO"
        description="Diseñamos estrategias SEO para aumentar visibilidad y captar leads."
        serviceType="SEO"
        offers={[
          { name: "SEO Inicial", currency: "USD" },
          { name: "SEO Avanzado", currency: "USD" },
          { name: "SEO Local", currency: "USD" }
        ]}
      />
      <SEO
        title="SEO Estratégico en Colombia | Aumenta Tu Visibilidad | Pantom"
        description="Investigación de palabras clave, técnica on-page/off-page y contenido para captar demanda real."
        canonicalUrl="https://pantom.net/servicios/seo"
      />
      <div className="relative min-h-screen pb-16 bg-[#0a0a0a] overflow-hidden">
        {/* Fondo con destellos/acento naranja */}
        <div aria-hidden="true" className="pointer-events-none select-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[radial-gradient(circle,rgba(234,90,25,0.25)_0%,transparent_70%)] blur-2xl z-0" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[radial-gradient(circle,rgba(234,90,25,0.18)_0%,transparent_70%)] blur-2xl z-0" />
          <div className="absolute top-1/2 left-0 w-40 h-40 bg-[radial-gradient(circle,rgba(234,90,25,0.10)_0%,transparent_80%)] blur-2xl z-0" />
        </div>
        <main className="relative z-10">
          {/* Encabezado */}
          <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Visibilidad y SEO estratégico: conecta con tu audiencia online
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              En el competitivo mundo digital, no basta con tener una gran web, necesitas que te encuentren. En Pantom, desarrollamos e implementamos estrategias SEO integrales y sostenibles (white-hat) diseñadas no solo para mejorar tu ranking, sino para atraer tráfico cualificado que realmente impulse tu negocio.
            </p>
            <div className="flex justify-center mb-8">
              <Image
                src="/images/services/visibilidad-y-seo-estrategico-conecta-con-tu-audiencia-online.png"
                alt="Gráfico ilustrando el aumento de visibilidad online mediante servicios SEO de Pantom"
                className="w-full max-w-2xl rounded-xl shadow-lg"
                width={1200}
                height={500}
                loading="lazy"
              />
            </div>
          </section>

          {/* Nuestros servicios SEO al detalle */}
          <section className="max-w-5xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Nuestros servicios SEO al detalle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <ListChecks className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Auditoría SEO completa</h3>
                <p className="text-gray-300 text-sm">
                  Análisis exhaustivo de tu sitio web (técnico, contenido, on-page, off-page) para identificar oportunidades y barreras de posicionamiento.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <KeyRound className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Investigación de palabras clave</h3>
                <p className="text-gray-300 text-sm">
                  Identificamos los términos de búsqueda relevantes que utiliza tu audiencia ideal para atraer tráfico con alta intención de conversión.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <FileText className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Optimización on-page</h3>
                <p className="text-gray-300 text-sm">
                  Refinamos tus meta tags, contenido, estructura de encabezados, enlaces internos y optimizamos imágenes para mejorar la relevancia y la experiencia.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Settings2 className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">SEO técnico avanzado</h3>
                <p className="text-gray-300 text-sm">
                  Aseguramos la correcta indexación, rastreabilidad, velocidad de carga (Core Web Vitals), datos estructurados (Schema) y salud general de tu sitio.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <FileText className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Estrategia de contenidos SEO</h3>
                <p className="text-gray-300 text-sm">
                  Planificamos y te ayudamos a crear contenido valioso y optimizado que responda a las preguntas de tus usuarios y atraiga enlaces.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Link2 className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Link building y autoridad</h3>
                <p className="text-gray-300 text-sm">
                  Desarrollamos estrategias éticas para aumentar la autoridad de tu dominio y obtener enlaces de calidad que impulsen tu ranking.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <MapPin className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">SEO local</h3>
                <p className="text-gray-300 text-sm">
                  Optimizamos tu presencia en Google My Business y directorios locales para atraer clientes en tu área geográfica específica (Tunja, Boyacá, Colombia).
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <BarChart2 className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Analítica y reportes</h3>
                <p className="text-gray-300 text-sm">
                  Monitorizamos tus rankings, tráfico orgánico, conversiones y te entregamos reportes claros para medir el ROI y ajustar la estrategia.
                </p>
              </div>
            </div>
          </section>

          {/* Nuestra metodología SEO */}
          <section className="max-w-3xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Nuestra metodología SEO
            </h2>
            <ol className="list-decimal list-inside text-gray-300 text-lg space-y-2 mb-4">
              <li>Auditoría y análisis</li>
              <li>Investigación y estrategia</li>
              <li>Implementación (on-page y técnica)</li>
              <li>Creación/optimización de contenido y link building</li>
              <li>Medición, reporte y ajuste continuo</li>
            </ol>
          </section>

          {/* Beneficios de una estrategia SEO profesional */}
          <section className="max-w-3xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ¿Por qué invertir en SEO con Pantom?
            </h2>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#ea5a19]" /> Aumento sostenible de la visibilidad orgánica.</li>
              <li className="flex items-center gap-2"><Star className="w-5 h-5 text-[#ea5a19]" /> Atracción de tráfico web más cualificado y relevante.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Mejora de la credibilidad y autoridad de marca online.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Mejor retorno de inversión (ROI) a largo plazo comparado con PPC.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Ventaja competitiva en los resultados de búsqueda.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Decisiones basadas en datos y resultados medibles.</li>
            </ul>
          </section>

          {/* CTA final */}
          <section className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">¿Listo para dominar los resultados de búsqueda?</h3>
              <p className="text-gray-300 mb-4">Descubre cómo nuestra estrategia SEO personalizada puede llevar tu negocio al siguiente nivel.</p>
              <Link
                href="/contacto?servicio=seo"
                className="inline-flex items-center px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg"
              >
                Solicita tu consulta SEO
              </Link>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
} 