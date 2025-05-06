import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Code, Server, Layers, ShoppingCart, Smartphone, Wrench, CheckCircle, Star } from "lucide-react";

export default function DesarrolloWeb() {
  return (
    <Layout>
      <Head>
        <title>Desarrollo web a medida con Next.js y React | Pantom Colombia</title>
        <meta
          name="description"
          content="Desarrollo web personalizado en Colombia: aplicaciones rápidas, escalables y optimizadas con Next.js, React y Node.js. ¡Impulsa tu presencia digital con Pantom!"
        />
      </Head>
      <main className="bg-[#0a0a0a] min-h-screen pb-16">
        {/* Encabezado */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Desarrollo web a medida: aplicaciones rápidas y escalables
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Convertimos tus ideas en experiencias digitales excepcionales. En Pantom, nos especializamos en el desarrollo web a medida, creando desde sitios web institucionales hasta aplicaciones web complejas con un enfoque total en la calidad, el rendimiento y la experiencia del usuario final.
          </p>
        </section>
        <div className="flex justify-center mb-8">
            <Image
              src="/images/services/Desarrollo web a medida aplicaciones rápidas y escalables.png"
              alt="Desarrollo web a medida aplicaciones rápidas y escalables"
              className="w-full max-w-2xl rounded-xl shadow-lg"
              width={1200}
              height={500}
              loading="lazy"
            />
          </div>
        {/* ¿Qué incluye nuestro servicio? */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            ¿Qué incluye nuestro servicio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Code className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Desarrollo frontend moderno</h3>
              <p className="text-gray-300 text-sm">
                Interfaces de usuario interactivas, rápidas y accesibles utilizando React, Next.js y las mejores prácticas de UI/UX.
              </p>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Server className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Desarrollo backend robusto</h3>
              <p className="text-gray-300 text-sm">
                Sistemas backend eficientes y seguros, APIs personalizadas e integraciones con servicios de terceros (Node.js, bases de datos).
              </p>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Layers className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Desarrollo full-stack completo</h3>
              <p className="text-gray-300 text-sm">
                Soluciones integrales que cubren desde la base de datos hasta la interfaz final, asegurando coherencia y rendimiento.
              </p>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <ShoppingCart className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Plataformas e-commerce</h3>
              <p className="text-gray-300 text-sm">
                Tiendas online personalizadas, optimizadas para la conversión, con integración de pasarelas de pago y gestión de inventario.
              </p>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Smartphone className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Aplicaciones web progresivas</h3>
              <p className="text-gray-300 text-sm">
                Experiencias web que se sienten como apps nativas, con capacidad offline y notificaciones push para mayor engagement.
              </p>
            </div>
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-start hover:shadow-xl transition-shadow group">
              <Wrench className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Mantenimiento y optimización</h3>
              <p className="text-gray-300 text-sm">
                Soporte continuo, actualizaciones de seguridad y optimización de rendimiento (Core Web Vitals) para que tu web esté siempre al día.
              </p>
            </div>
          </div>
        </section>

        {/* Tecnologías clave */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Tecnologías clave
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Image src="/images/tecnologias/react.png" alt="React" width={48} height={48} />
            <Image src="/images/tecnologias/next-js.png" alt="Next.js" width={48} height={48} />
            <Image src="/images/tecnologias/node-js.png" alt="Node.js" width={48} height={48} />
            <Image src="/images/tecnologias/postgre.png" alt="PostgreSQL" width={48} height={48} />
            <Image src="/images/tecnologias/mongo.png" alt="MongoDB" width={48} height={48} />
            <Image src="/images/tecnologias/vercel.png" alt="Vercel" width={48} height={48} />
            <Image src="/images/tecnologias/aws.png" alt="AWS" width={48} height={48} />
            {/* Agrega más logos si lo deseas */}
          </div>
        </section>

        {/* Nuestro enfoque */}
        <section className="max-w-3xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Nuestro enfoque: calidad y colaboración
          </h2>
          <p className="text-gray-300 text-lg mb-4 text-center">
            Analizamos tus necesidades, diseñamos la mejor experiencia de usuario, desarrollamos de forma ágil y probamos rigurosamente cada proyecto. Mantenemos una comunicación constante y transparente para que siempre estés al tanto del avance. <Link href="/nosotros" className="text-[#ea5a19] underline hover:text-[#ff8f59]">Conoce nuestra metodología</Link>.
          </p>
        </section>

        {/* Beneficios clave */}
        <section className="max-w-3xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            ¿Por qué elegir a Pantom para tu desarrollo web?
          </h2>
          <ul className="space-y-3 text-gray-300 text-lg">
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Soluciones 100% personalizadas a tus necesidades.</li>
            <li className="flex items-center gap-2"><Star className="w-5 h-5 text-[#ea5a19]" /> Enfoque en rendimiento y optimización (velocidad, Core Web Vitals).</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Experiencias de usuario (UX/UI) intuitivas y atractivas.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Código limpio, escalable y mantenible.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Seguridad integrada desde el diseño.</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#ea5a19]" /> Proceso colaborativo y comunicación transparente.</li>
          </ul>
        </section>

        {/* CTA final */}
        <section className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">¿Listo para construir o mejorar tu presencia digital?</h3>
            <p className="text-gray-300 mb-4">Hablemos sobre cómo podemos llevar tu proyecto web al siguiente nivel.</p>
            <Link
              href="/contacto?servicio=desarrollo-web"
              className="inline-flex items-center px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg"
            >
              Solicita tu consulta de desarrollo web
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
} 