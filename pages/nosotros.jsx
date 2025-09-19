import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import About from '@/components/About';
import Image from 'next/image';

export default function Nosotros() {
  const title = 'Sobre nosotros';
  const description = 'Conoce al equipo y nuestra forma de trabajar en Pantom Digital Studio.';
  const url = 'https://pantom.net/nosotros';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: 'Pantom Digital Studio'
    }
  };

  return (
    <Layout>
      <SEO
        title={`${title} | Pantom Digital Studio`}
        description={description}
        ogImage={'/og-image.jpg'}
        ogUrl={url}
        canonicalUrl={url}
        type="website"
        structuredData={structuredData}
      />
      <About />

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Nuestro enfoque</h3>
        <p className="text-gray-300 mb-8">
          Alineamos estrategia, contenido y tecnología para lograr resultados medibles.
          Priorizamos research, iteración y comunicación clara con cada stakeholder.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#171717] rounded-xl p-6 border border-[#262626]">
            <h4 className="text-xl font-semibold mb-2">Estrategia</h4>
            <p className="text-gray-400">Diagnóstico, objetivos SMART y roadmap priorizado.</p>
          </div>
          <div className="bg-[#171717] rounded-xl p-6 border border-[#262626]">
            <h4 className="text-xl font-semibold mb-2">Experiencia</h4>
            <p className="text-gray-400">UX/UI y contenido orientado a conversión.</p>
          </div>
          <div className="bg-[#171717] rounded-xl p-6 border border-[#262626]">
            <h4 className="text-xl font-semibold mb-2">Tecnología</h4>
            <p className="text-gray-400">Stack moderno, performance y analítica de punta a punta.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Valores</h3>
        <ul className="grid md:grid-cols-2 gap-4 list-disc list-inside text-gray-300">
          <li>Transparencia y colaboración</li>
          <li>Foco en impacto de negocio</li>
          <li>Mejora continua y aprendizaje</li>
          <li>Calidad y atención al detalle</li>
        </ul>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-semibold mb-8">Casos de éxito</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#171717] rounded-2xl p-6 border border-[#262626]">
            <div className="h-12 relative mb-4">
              <Image src="/images/clients/starsbranding.png" alt="Stars Branding" fill className="object-contain" />
            </div>
            <h4 className="text-xl font-semibold mb-2">starsbranding.com</h4>
            <p className="text-gray-400 mb-4">SEO continuo desde 2018 con resultados óptimos y crecimiento sostenido.</p>
            <ul className="text-gray-400 text-sm space-y-1 mb-4 list-disc list-inside">
              <li>+180% tráfico orgánico en 12 meses</li>
              <li>35 keywords en Top 3, 120 en Top 10</li>
              <li>Leads orgánicos +120% vs año anterior</li>
            </ul>
            <blockquote className="text-gray-300 italic">“El trabajo SEO de Pantom elevó nuestra visibilidad y la captación de clientes de forma sostenida.”</blockquote>
          </div>

          <div className="bg-[#171717] rounded-2xl p-6 border border-[#262626]">
            <div className="h-12 relative mb-4">
              <Image src="/images/clients/microgen.png" alt="Microgen" fill className="object-contain" />
            </div>
            <h4 className="text-xl font-semibold mb-2">microgenltda.com.co</h4>
            <p className="text-gray-400 mb-4">SEO y social media, administración de e‑commerce y bases de datos.</p>
            <ul className="text-gray-400 text-sm space-y-1 mb-4 list-disc list-inside">
              <li>+140% visibilidad SEO y +95% tráfico orgánico</li>
              <li>Comunidad social +85% y CTR +1.8 pp</li>
              <li>Conversión e‑commerce 1.2% → 2.4%, AOV +18%</li>
            </ul>
            <blockquote className="text-gray-300 italic">“Un acompañamiento integral que mejoró visibilidad, comunidad y ventas.”</blockquote>
          </div>

          <div className="bg-[#171717] rounded-2xl p-6 border border-[#262626]">
            <div className="h-12 relative mb-4">
              <Image src="/images/clients/diamond-spa.png" alt="Diamond Skin and Body Spa" fill className="object-contain" />
            </div>
            <h4 className="text-xl font-semibold mb-2">diamondskinandbodyspa.com</h4>
            <p className="text-gray-400 mb-4">Automatización de procesos y atracción de leads con tracking GA4 y GTM.</p>
            <ul className="text-gray-400 text-sm space-y-1 mb-4 list-disc list-inside">
              <li>−60% tiempo operativo en procesos clave</li>
              <li>Leads mensuales +130% y CPL −35%</li>
              <li>12 eventos GA4 y 8 etiquetas GTM implementadas</li>
            </ul>
            <blockquote className="text-gray-300 italic">“Las automatizaciones mejoraron notablemente la eficiencia y el flujo de leads.”</blockquote>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="bg-[#111] border border-[#262626] rounded-2xl p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">¿Listo para crecer?</h3>
          <p className="text-gray-300 mb-6">Hablemos de tus objetivos y definamos un plan claro.</p>
          <a
            href="/contacto"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
          >
            Ir a contacto
          </a>
        </div>
      </section>
    </Layout>
  );
}


