import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import dynamic from "next/dynamic";
const SuccessCases = dynamic(() => import("../components/SuccessCases"), {
  ssr: false,
  loading: () => <div className="h-28 opacity-50" />,
});
import Process from '../components/Process';
const BlogSection = dynamic(() => import('../components/BlogSection'), {
  ssr: false,
  loading: () => <div className="h-40 opacity-50" />,
});
import FinalCTA from '../components/FinalCTA';
import { motion } from "framer-motion";
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import NewsletterForm from '../components/NewsletterForm';
import OrganizationJsonLd from '@/components/SEO/OrganizationJsonLd';

const ParticlesBackgroundServicios = dynamic(
  () => import("@/components/ParticlesBackgroundServicios"),
  { ssr: false }
);

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
      <OrganizationJsonLd />
      <SEO
        title="Pantom Digital Studio | Desarrollo Web, Datos y SEO en Colombia"
        description="Soluciones digitales a medida: desarrollo web con Next.js, bases de datos y estrategias SEO que impulsan tu crecimiento."
        ogImage="/og-image.jpg"
        ogUrl="https://pantom.net"
        canonicalUrl="https://pantom.net"
        type="website"
        locale={locale === 'es' ? 'es_ES' : 'en_US'}
        alternateLocales={locale === 'es' ? ['en_US'] : ['es_ES']}
        structuredData={structuredData}
      />
    <Layout> 
      <div className="relative min-h-screen">
        <ParticlesBackgroundServicios />
        <Hero />
        <Introduction />
        <Process />
        <SuccessCases />
        <BlogSection />
        <FinalCTA />
      </div>
    </Layout>
    </>
  );
}
