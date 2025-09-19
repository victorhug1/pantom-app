import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import Error from 'next/error';
import Layout from '@/components/Layout';
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';

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
    <Layout>
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

      {pageData.type === 'about' && (
        <About />
      )}

      {pageData.type === 'contact' && (
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">{pageData.title}</h1>
          <p className="text-lg text-gray-300 mb-10">{pageData.description}</p>
          <ContactForm />
        </section>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  // Ya existen páginas dedicadas para 'nosotros' y 'contacto'
  const validPages = [];
  const paths = validPages.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  
  // ✅ VALIDACIÓN ESTRICTA - Actualmente no hay slugs permitidos aquí
  const allowedSlugs = [];
  
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
  
  return {
    notFound: true
  };
} 