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
  // Solo generar paths para páginas válidas conocidas (excluyendo servicios que tiene su propia carpeta)
  const validPages = ['nosotros', 'contacto'];
  
  const paths = validPages.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false // ✅ CRÍTICO: Solo generar páginas de la lista blanca
  };
}

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  
  // ✅ VALIDACIÓN ESTRICTA - Lista blanca de slugs permitidos
  const allowedSlugs = ['nosotros', 'contacto'];
  
  // Excluir archivos del sitemap y robots
  if (slug === 'sitemap.xml' || slug === 'robots.txt') {
    return {
      notFound: true
    };
  }
  
  // Verificar que el slug esté en la lista blanca
  if (!allowedSlugs.includes(slug)) {
    console.log(`🚨 BLOCKED INVALID SLUG: ${slug}`);
    return {
      notFound: true // ✅ 404 real, no página generada
    };
  }
  
  // ✅ VALIDACIÓN ADICIONAL - Patrón de slug válido
  if (!slug || typeof slug !== 'string' || !/^[a-zA-Z0-9-]+$/.test(slug)) {
    console.log(`🚨 BLOCKED INVALID SLUG PATTERN: ${slug}`);
    return {
      notFound: true
    };
  }
  
  // ✅ VALIDACIÓN ANTI-SPAM - Palabras clave bloqueadas
  const spamWords = [
    'casino', 'bet', 'poker', 'gambling', 'bonus', 'jackpot', 'roulette', 
    'blackjack', 'slots', 'ggbet', 'slottica', 'pin-up', '1xbet',
    'oficjalna', 'strona', 'zaklady', 'sportowe', 'kasyno',
    'turkiye', 'giris', 'kazanin', 'telecharger', 'burkina', 'faso'
  ];
  
  if (spamWords.some(word => slug.toLowerCase().includes(word.toLowerCase()))) {
    console.log(`🚨 BLOCKED SPAM SLUG: ${slug}`);
    return {
      notFound: true
    };
  }
  
  // Aquí irá la lógica para obtener los datos de la página
  return {
    props: {
      pageData: null // Reemplazar con datos reales
    },
    revalidate: 3600 // ✅ Revalidar cada hora
  };
} 