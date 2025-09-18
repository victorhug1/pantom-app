import Head from "next/head";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import SuccessCases from "../components/SuccessCases";
import Process from '../components/Process';
import BlogSection from '../components/BlogSection';
import FinalCTA from '../components/FinalCTA';
import { motion } from "framer-motion";
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import NewsletterForm from '../components/NewsletterForm';

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
      <SEO
        title="Pantom Digital Studio | Transformación Digital y Marketing"
        description="Somos un estudio digital especializado en transformación digital, marketing y desarrollo web. Ayudamos a empresas a crecer en el mundo digital."
        ogImage="/og-image.jpg"
        ogUrl="https://pantom.digital"
        canonicalUrl="https://pantom.net"
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
