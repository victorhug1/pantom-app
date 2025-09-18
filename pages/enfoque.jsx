import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import {
  Settings2,
  Rocket,
  User,
  Cloud,
  Scale,
  DollarSign,
  HeartPulse,
  ArrowRight,
  Briefcase
} from "lucide-react";

export default function Enfoque() {
  return (
    <Layout>
      <Head>
        <title>Enfoque: Soluciones Digitales por Industria y Desafío | Pantom</title>
        <meta
          name="description"
          content="En Pantom resolvemos retos de negocio y sectoriales con soluciones digitales a medida. Experiencia en legal, fintech, salud y más. Optimización, desarrollo y estrategia en Colombia." />
      </Head>
      <main className="bg-[#0a0a0a] min-h-screen pb-16">
        {/* Encabezado */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Nuestro enfoque - Soluciones digitales para tus desafíos e industria
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Entendemos que cada negocio es único. Por eso, aplicamos nuestra experiencia en desarrollo, datos, SEO y estrategia no solo para ofrecer servicios, sino para crear soluciones específicas que responden directamente a tus desafíos operativos y al contexto particular de tu industria.
          </p>
          <div className="flex justify-center mb-8">
            <Image
              src="/images/services/enfoque.png"
              alt="Diagrama del enfoque de Pantom en soluciones digitales por desafío e industria"
              className="w-full max-w-2xl rounded-xl shadow-lg"
              width={1200}
              height={500}
              loading="lazy"
            />
          </div>
        </section>

        {/* Soluciones para tus Desafíos de Negocio */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Soluciones Estratégicas para tus retos clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Settings2 className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Optimización de Procesos y Automatización</h3>
              <p className="text-gray-300 text-sm">
                Analizamos tus flujos de trabajo y desarrollamos bases de datos y aplicaciones a medida para aumentar tu eficiencia operativa y reducir tareas manuales.
              </p>
              <Link href="/servicios/desarrollo-web" className="mt-2 text-[#ea5a19] hover:underline text-sm flex items-center gap-1">Consultar sobre este desafío <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Rocket className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Lanzamiento y Escalado de Productos Digitales</h3>
              <p className="text-gray-300 text-sm">
                Te acompañamos desde la idea hasta el lanzamiento de tu MVP o producto digital completo, definiendo la estrategia tecnológica y desarrollando una solución escalable.
              </p>
              <Link href="/servicios/estrategia-digital" className="mt-2 text-[#ea5a19] hover:underline text-sm flex items-center gap-1">Consultar sobre este desafío <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <User className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Mejora de la Experiencia del Cliente Digital</h3>
              <p className="text-gray-300 text-sm">
                Aplicamos principios de UX/UI y análisis de datos para optimizar los puntos de contacto digitales con tus clientes, aumentando la satisfacción y conversión.
              </p>
              <Link href="/servicios/seo" className="mt-2 text-[#ea5a19] hover:underline text-sm flex items-center gap-1">Consultar sobre este desafío <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Cloud className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Modernización Tecnológica y Migración</h3>
              <p className="text-gray-300 text-sm">
                Te ayudamos a migrar sistemas legados, adoptar tecnologías en la nube y modernizar tu infraestructura tecnológica de forma segura y planificada.
              </p>
              <Link href="/servicios/bases-de-datos" className="mt-2 text-[#ea5a19] hover:underline text-sm flex items-center gap-1">Consultar sobre este desafío <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* Experiencia Comprobada en tu Sector */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Experiencia comprobada en tu sector
          </h2>
          <p className="text-gray-300 text-lg mb-6 text-center">
            Además de resolver desafíos comunes, tenemos experiencia y un interés especial en aportar valor a industrias específicas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Scale className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Firmas Legales (Inmigración)</h3>
              <p className="text-gray-300 text-sm">
                Entendemos las necesidades únicas de las firmas legales, especialmente en inmigración: gestión segura de casos, comunicación eficiente con clientes hispanohablantes y estrategias SEO específicas para el nicho.
              </p>
              <Link href="/contacto?sector=legal" className="mt-2 text-[#ea5a19] hover:underline text-sm flex items-center gap-1">Consultar para Firmas Legales <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="bg-[#181818]/60 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <DollarSign className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">FinTech (Próximamente)</h3>
              <p className="text-gray-300 text-sm">
                Explorando soluciones para el sector financiero, enfocadas en seguridad, procesamiento de datos y cumplimiento normativo.
              </p>
              <span className="mt-2 text-gray-400 text-sm flex items-center gap-1">Contáctanos si perteneces a este sector</span>
            </div>
            <div className="bg-[#181818]/60 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <HeartPulse className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">HealthTech (Próximamente)</h3>
              <p className="text-gray-300 text-sm">
                Interesados en aplicar tecnología para mejorar la gestión de datos de salud, respetando la privacidad y normativas como HIPAA.
              </p>
              <span className="mt-2 text-gray-400 text-sm flex items-center gap-1">Contáctanos si perteneces a este sector</span>
            </div>
            <div className="bg-[#181818]/60 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Briefcase className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Otro sector</h3>
              <p className="text-gray-300 text-sm">
                ¿Tu industria no está aquí? Podemos crear soluciones digitales a medida para cualquier sector.
              </p>
              <span className="mt-2 text-gray-400 text-sm flex items-center gap-1">Contáctanos si perteneces a este sector</span>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">¿Tu desafío o industria no está en la lista?</h3>
            <p className="text-gray-300 mb-4">¡No te preocupes! Nuestra fortaleza es crear soluciones a medida. Hablemos sobre tus necesidades específicas.</p>
            <Link
              href="/contacto?servicio=estrategia-digital"
              className="inline-flex items-center px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg"
            >
              Agendar Consulta Estratégica
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
} 