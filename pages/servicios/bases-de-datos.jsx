import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import {
  Database,
  Code2,
  ArrowRightLeft,
  Zap,
  MonitorCheck,
  ShieldCheck,
  Settings,
  BarChart2,
  CheckCircle,
  Star
} from "lucide-react";

export default function BasesDeDatos() {
  return (
    <Layout>
      <Head>
        <title>Servicios de bases de datos a medida: diseño, optimización, admin | Pantom</title>
        <meta
          name="description"
          content="Soluciones profesionales en bases de datos: diseño, migración, optimización, seguridad y BI. Bases de datos relacionales y NoSQL en Colombia. ¡Transforma tus datos en activos estratégicos con Pantom!"
        />
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
              Bases de datos a medida: transforma tus datos en activos estratégicos
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Tus datos son uno de tus activos más valiosos. En Pantom, diseñamos, desarrollamos y administramos soluciones de bases de datos robustas, seguras y eficientes que te permiten no solo almacenar información, sino también extraer inteligencia, automatizar procesos y tomar decisiones informadas.
            </p>

            <div className="flex justify-center mb-8">
              <Image
                src="/images/services/bases-de-datos-a-medida-transforma-tus-datos-en-activos-estrategicos.png"
                alt="Diagrama abstracto de flujo de datos y optimización de bases de datos por Pantom"
                className="w-full max-w-2xl rounded-xl shadow-lg"
                width={1200}
                height={500}
                loading="lazy"
              />
            </div>
          </section>

          {/* Nuestros servicios de gestión de datos */}
          <section className="max-w-5xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Nuestros servicios de bases de datos e inteligencia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Code2 className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Diseño y modelado de datos</h3>
                <p className="text-gray-300 text-sm">
                  Creamos estructuras de bases de datos (relacionales y NoSQL) optimizadas, escalables y alineadas con tus necesidades de negocio presentes y futuras.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Database className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Desarrollo e implementación BBDD</h3>
                <p className="text-gray-300 text-sm">
                  Implementamos tus bases de datos en las tecnologías adecuadas (PostgreSQL, MySQL, MongoDB, SQL Server, etc.), tanto on-premise como en la nube.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <ArrowRightLeft className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Migración de bases de datos</h3>
                <p className="text-gray-300 text-sm">
                  Planificamos y ejecutamos migraciones de datos seguras y eficientes entre diferentes plataformas o hacia la nube (AWS, Google Cloud, Azure).
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Zap className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Optimización de rendimiento</h3>
                <p className="text-gray-300 text-sm">
                  Analizamos y optimizamos consultas, índices y configuraciones para asegurar que tus bases de datos funcionen con la máxima velocidad y eficiencia.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <MonitorCheck className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Administración y mantenimiento</h3>
                <p className="text-gray-300 text-sm">
                  Ofrecemos servicios de administración proactiva, monitoreo, copias de seguridad y mantenimiento para garantizar la disponibilidad y salud de tus BBDD.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <ShieldCheck className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Seguridad de datos</h3>
                <p className="text-gray-300 text-sm">
                  Implementamos las mejores prácticas de seguridad para proteger tus datos sensibles contra accesos no autorizados y amenazas.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <Settings className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Integración y ETL</h3>
                <p className="text-gray-300 text-sm">
                  Desarrollamos procesos de extracción, transformación y carga (ETL) para consolidar e integrar datos de diversas fuentes.
                </p>
              </div>
              <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
                <BarChart2 className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white mb-2">Business intelligence y reporting</h3>
                <p className="text-gray-300 text-sm">
                  Te ayudamos a conectar tus datos con herramientas de BI para crear dashboards y reportes visuales que faciliten el análisis.
                </p>
              </div>
            </div>
          </section>

          {/* Tecnologías de bases de datos */}
          <section className="max-w-4xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Tecnologías con las que trabajamos
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Image src="/images/tecnologias/postgre.png" alt="PostgreSQL" width={48} height={48} />
              <Image src="/images/tecnologias/mysql.png" alt="MySQL" width={48} height={48} />
              <Image src="/images/tecnologias/mongo.png" alt="MongoDB" width={48} height={48} />
              <Image src="/images/tecnologias/sqlserver.png" alt="SQL Server" width={48} height={48} />
              <Image src="/images/tecnologias/aws.png" alt="AWS" width={48} height={48} />
              <Image src="/images/tecnologias/google-cloud.png" alt="Google Cloud" width={48} height={48} />
              <Image src="/images/tecnologias/azure.png" alt="Azure" width={48} height={48} />
              {/* Agrega más logos si lo deseas */}
            </div>
          </section>

          {/* Nuestro proceso para soluciones de datos */}
          <section className="max-w-3xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Cómo abordamos tus necesidades de datos
            </h2>
            <p className="text-gray-300 text-lg mb-4 text-center">
              Analizamos tus requerimientos, modelamos cuidadosamente la estructura de datos, planificamos la implementación o migración, y realizamos pruebas exhaustivas de integridad y rendimiento. Nuestro equipo te acompaña en la administración y evolución de tus soluciones de datos.
            </p>
          </section>

          {/* Beneficios clave */}
          <section className="max-w-3xl mx-auto px-4 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Ventajas de nuestras soluciones de datos
            </h2>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Integridad y consistencia de tus datos.</li>
              <li className="flex items-center gap-2"><Star className="w-5 h-5 text-[#ea5a19]" /> Acceso rápido y eficiente a la información.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Mayor seguridad para proteger activos críticos.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Bases de datos escalables que crecen contigo.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Habilitación para análisis avanzado y business intelligence.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Automatización de tareas y mejora de procesos.</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Toma de decisiones basada en evidencia.</li>
            </ul>
          </section>

          {/* CTA final */}
          <section className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">¿Listo para desbloquear el potencial de tus datos?</h3>
              <p className="text-gray-300 mb-4">Conversemos sobre cómo una solución de base de datos a medida puede transformar tu negocio.</p>
              <Link
                href="/contacto?servicio=bases-de-datos"
                className="inline-flex items-center px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg"
              >
                Solicita una consulta sobre bases de datos
              </Link>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
} 