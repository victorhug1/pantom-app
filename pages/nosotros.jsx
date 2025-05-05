import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import {
  Users,
  Target,
  Gem,
  Eye,
  Puzzle,
  ArrowRight,
  Linkedin
} from "lucide-react";

export default function Nosotros() {
  return (
    <Layout>
      <Head>
        <title>Sobre Nosotros | Pantom - Estudio Digital Colaborativo en Tunja, Colombia</title>
        <meta
          name="description"
          content="Conoce a Pantom: estudio digital en Colombia. Misión, visión, valores, equipo y metodología colaborativa para impulsar tu éxito digital." />
      </Head>
      <main className="bg-[#0a0a0a] min-h-screen pb-16">
        {/* Encabezado */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Somos Pantom: Tu Estudio Digital Colaborativo
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Más que una agencia, somos un estudio digital apasionado por la tecnología y los resultados tangibles. Desde Tunja, Boyacá, colaboramos estrechamente con negocios como el tuyo para diseñar y construir soluciones digitales a medida que realmente marcan la diferencia.
          </p>
          <div className="flex justify-center mb-8">
            <Image
              src="/images/nosotros-equipo.jpg"
              alt="Equipo de Pantom Estudio Digital"
              className="w-full max-w-2xl rounded-xl shadow-lg"
              width={1200}
              height={600}
              loading="lazy"
            />
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="max-w-3xl mx-auto px-4 mb-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Nuestra Misión: Impulsar tu Éxito Digital
          </h2>
          <p className="text-gray-300 text-lg mb-2">
            Existimos para ayudar a empresas y emprendedores a aprovechar el potencial de la tecnología. Nuestro propósito es crear soluciones digitales de calidad, personalizadas y alineadas con tus objetivos, construyendo relaciones de confianza y colaboración a largo plazo. No somos una agencia tradicional: somos tu socio estratégico en el mundo digital.
          </p>
        </section>

        {/* Valores */}
        <section className="max-w-6xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Los Valores que nos Guían
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow group">
              <Users className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Colaboración Estrecha</h3>
              <p className="text-gray-300 text-sm text-center">Trabajamos contigo, no solo para ti. Creemos en la comunicación constante y en ser una extensión de tu equipo.</p>
            </div>
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow group">
              <Target className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Compromiso con Resultados</h3>
              <p className="text-gray-300 text-sm text-center">Tu éxito es nuestro éxito. Nos enfocamos en entregar soluciones que generen un impacto medible y positivo en tu negocio.</p>
            </div>
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow group">
              <Gem className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Calidad y Excelencia Técnica</h3>
              <p className="text-gray-300 text-sm text-center">Nos apasiona la tecnología bien hecha. Buscamos la excelencia en cada línea de código, diseño y estrategia que implementamos.</p>
            </div>
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow group">
              <Eye className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Transparencia Total</h3>
              <p className="text-gray-300 text-sm text-center">Procesos claros, comunicación honesta y sin sorpresas. Creemos en construir relaciones basadas en la confianza mutua.</p>
            </div>
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow group">
              <Puzzle className="w-8 h-8 text-[#ea5a19] mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">Adaptabilidad y Soluciones Reales</h3>
              <p className="text-gray-300 text-sm text-center">Entendemos que cada negocio es diferente. Escuchamos tus necesidades para crear soluciones verdaderamente "a la medida".</p>
            </div>
          </div>
        </section>

        {/* Equipo (placeholder, puedes personalizar) */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Conoce al Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-[#181818]/70 border border-white/10 rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow group">
              <Image
                src="/images/equipo/victor.jpg"
                alt="Víctor Hugo - Fundador y Estratega Digital"
                className="w-24 h-24 rounded-full mb-4 object-cover"
                width={200}
                height={200}
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-white mb-1">Víctor Hugo</h3>
              <p className="text-[#ea5a19] text-sm mb-2">Fundador y Estratega Digital</p>
              <p className="text-gray-300 text-sm text-center mb-2">Apasionado por la tecnología, la estrategia y el desarrollo de soluciones digitales que generan impacto real.</p>
              <div className="flex gap-2">
                <a href="https://www.linkedin.com/in/victorhug1/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ea5a19]">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            {/* Puedes agregar más miembros aquí */}
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section className="max-w-3xl mx-auto px-4 mb-16 text-center">
          <p className="text-gray-300 text-lg mb-4">
            Nuestros valores se reflejan en nuestra forma de trabajar: comunicación constante, procesos claros y soluciones a medida.
          </p>
          <Link
            href="/#proceso"
            className="inline-flex items-center px-6 py-3 bg-[#181818] text-white font-semibold rounded-lg hover:bg-[#ea5a19] transition-colors text-lg border border-white/10"
          >
            Descubre Nuestra Metodología <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </section>

        {/* CTA final */}
        <section className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">¿Listo para Colaborar?</h3>
            <p className="text-gray-300 mb-4">Nos encantaría conocer tu visión y explorar cómo podemos ayudarte a hacerla realidad.</p>
            <Link
              href="/contacto"
              className="inline-flex items-center px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg"
            >
              Contacta con Nosotros
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
} 