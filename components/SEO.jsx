import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO({ 
  title = 'Pantom Digital Studio | Transformación Digital y Marketing',
  description = 'Somos un estudio digital especializado en transformación digital, marketing y desarrollo web. Ayudamos a empresas a crecer en el mundo digital.',
  keywords = 'transformación digital, marketing digital, desarrollo web, diseño web, branding, consultoría digital',
  ogImage = '/og-image.jpg',
  ogUrl = 'https://pantom.digital',
  canonicalUrl = 'https://pantom.digital',
  author = 'Pantom Digital Studio',
  article = false,
  publishedTime,
  modifiedTime,
  type = 'website',
  locale = 'es_ES',
  alternateLocales = ['en_US'],
  robots = 'index, follow',
  structuredData,
  forceCanonical = false // Para forzar canonical duro (ej. en /contacto con parámetros)
}) {
  const router = useRouter();
  const hasParams = router?.asPath?.includes('?');
  
  // Si forceCanonical es true y hay parámetros, usar canonical duro
  const finalCanonicalUrl = (forceCanonical && hasParams) 
    ? canonicalUrl.replace(/\?.*$/, '') // Quitar parámetros del canonical
    : canonicalUrl;
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Language Alternates */}
      {alternateLocales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={`${canonicalUrl}?lang=${locale}`} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={locale} />
      {alternateLocales.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pantomdigital" />
      <meta name="twitter:creator" content="@pantomdigital" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article Specific */}
      {article && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
} 