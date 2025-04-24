import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import Error from 'next/error';

export default function DynamicPage({ pageData }) {
  const router = useRouter();
  const { locale } = router;

  if (!pageData) {
    return <Error statusCode={404} />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": `https://pantom.digital/${pageData.slug}`,
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
        title={`${pageData.title} | Pantom Digital Studio`}
        description={pageData.description}
        ogImage={pageData.image || '/og-image.jpg'}
        ogUrl={`https://pantom.digital/${pageData.slug}`}
        canonicalUrl={`https://pantom.digital/${pageData.slug}`}
        type="website"
        locale={locale === 'es' ? 'es_ES' : 'en_US'}
        alternateLocales={locale === 'es' ? ['en_US'] : ['es_ES']}
        structuredData={structuredData}
      />
      {/* Contenido de la página */}
    </>
  );
}

export async function getStaticPaths() {
  // Aquí irá la lógica para generar los paths dinámicos
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({ params, locale }) {
  // Aquí irá la lógica para obtener los datos de la página
  return {
    props: {
      pageData: null // Reemplazar con datos reales
    }
  };
} 