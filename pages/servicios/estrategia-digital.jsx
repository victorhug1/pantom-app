import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import {
  Search,
  BarChart2,
  Target,
  Megaphone,
  Calendar,
  Map,
  User,
  Rocket,
  ListChecks,
  TrendingUp,
  CheckCircle,
  Star,
  Compass
} from "lucide-react";

export default function EstrategiaDigital() {
  return (
    <Layout>
      <Head>
        <title>Consultoría Estrategia Digital Colombia | Planificación, Marketing | Pantom</title>
        <meta
          name="description"
          content="Consultoría en estrategia digital para pymes y empresas en Colombia. Planificación, marketing digital, definición de KPIs, roadmap tecnológico y transformación digital con Pantom." />
      </Head>
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
              Estrategia digital clara - Tu Hoja de ruta hacia el éxito online
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              El éxito digital no sucede por casualidad, requiere un plan. En Pantom, te ayudamos a definir ese plan. Analizamos tu negocio, tu mercado y tus objetivos para crear estrategias digitales accionables y personalizadas que te guíen en la toma de decisiones y la optimización de tus recursos.
            </p>
            <div className="flex justify-center mb-8">
              <Image
                src="/images/services/Estrategia digital.png"
                alt="Ilustración de hoja de ruta estratégica digital creada por Pantom"
                className="w-full max-w-2xl rounded-xl shadow-lg"
                width={1200}
                height={500}
                loading="lazy"
              />
            </div>
          </section>

          {/* Nuestros Servicios de Consultoría Estratégica */}
          <section className="max-w-5xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Nuestros Servicios de Consultoría Estratégica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Search className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Análisis y Diagnóstico Digital</h3>
                <p className="text-gray-300 text-sm">
                  Evaluamos tu situación actual, presencia online, competencia y activos digitales para identificar fortalezas, debilidades y oportunidades (Análisis DAFO Digital).
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Target className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Definición de Objetivos y KPIs</h3>
                <p className="text-gray-300 text-sm">
                  Traducimos tus metas de negocio en objetivos digitales medibles y establecemos los Indicadores Clave de Rendimiento (KPIs) para rastrear el éxito.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Megaphone className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Estrategia de Marketing Digital</h3>
                <p className="text-gray-300 text-sm">
                  Creamos planes estratégicos definiendo audiencias clave, canales prioritarios (SEO, SEM, Contenido, etc.) y mensajes centrales para alcanzar tus metas.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Calendar className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Estrategia de Contenidos</h3>
                <p className="text-gray-300 text-sm">
                  Planificamos los temas, formatos y canales de distribución de contenido para atraer, enganchar y convertir a tu público objetivo.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Map className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Hoja de Ruta Tecnológica</h3>
                <p className="text-gray-300 text-sm">
                  Te asesoramos en la elección de tecnologías y definimos un roadmap claro para el desarrollo e implementación de tus plataformas digitales.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <User className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Estrategia de Experiencia de Usuario (UX)</h3>
                <p className="text-gray-300 text-sm">
                  Mapeamos el viaje de tu cliente (Customer Journey) y definimos estrategias para optimizar cada punto de contacto digital, mejorando la satisfacción y conversión.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Rocket className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Consultoría en Transformación Digital</h3>
                <p className="text-gray-300 text-sm">
                  Te guiamos en la adopción de tecnologías y procesos digitales para modernizar tu negocio y mejorar tu eficiencia operativa.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <ListChecks className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Plan de Implementación y Medición</h3>
                <p className="text-gray-300 text-sm">
                  Entregamos un plan de acción detallado y te asesoramos sobre cómo implementar la estrategia y medir su impacto efectivo a través de analítica.
                </p>
              </div>
            </div>
          </section>

          {/* Nuestro Proceso Estratégico Colaborativo */}
          <section className="max-w-3xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Nuestro Enfoque Estratégico
            </h2>
            <p className="text-gray-300 text-lg mb-2 text-center">
              Nuestro proceso inicia con una fase de inmersión profunda para entender tu negocio, tus retos y oportunidades. Analizamos datos y el mercado, realizamos talleres colaborativos (si aplica) y desarrollamos una estrategia clara y un plan de acción personalizado. Presentamos los resultados de forma comprensible y te asesoramos en los siguientes pasos para asegurar la ejecución efectiva.
            </p>
          </section>

          {/* Beneficios de una Estrategia Digital Bien Definida */}
          <section className="max-w-3xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ¿Por Qué Necesitas una Estrategia Digital Clara?
            </h2>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center gap-2"><Compass className="w-5 h-5 text-[#ea5a19]" /> Claridad y enfoque en los objetivos de negocio reales.</li>
              <li className="flex items-center gap-2"><BarChart2 className="w-5 h-5 text-[#ea5a19]" /> Optimización de la inversión en marketing y tecnología.</li>
              <li className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#ea5a19]" /> Toma de decisiones basada en análisis y datos, no en suposiciones.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Alineación de todos los esfuerzos digitales hacia metas comunes.</li>
              <li className="flex items-center gap-2"><ListChecks className="w-5 h-5 text-[#ea5a19]" /> Hoja de ruta clara que facilita la ejecución y medición.</li>
              <li className="flex items-center gap-2"><Star className="w-5 h-5 text-[#ea5a19]" /> Identificación proactiva de oportunidades de crecimiento y mejora.</li>
              <li className="flex items-center gap-2"><Rocket className="w-5 h-5 text-[#ea5a19]" /> Mayor agilidad para adaptarse a los cambios del mercado.</li>
            </ul>
          </section>

          {/* CTA final */}
          <section className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">¿Listo para Trazar tu Ruta hacia el Éxito Digital?</h3>
              <p className="text-gray-300 mb-4">Una buena estrategia es el primer paso. Conversemos sobre cómo podemos definir la tuya.</p>
              <Link
                href="/contacto?servicio=estrategia-digital"
                className="inline-flex items-center px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg"
              >
                Agenda tu Consulta Estratégica
              </Link>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
} 