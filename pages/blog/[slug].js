import SEO from '@/components/SEO';
import { useRouter } from 'next/router';

export default function BlogPost({ post }) {
  const router = useRouter();
  const { locale } = router;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": "Pantom Digital Studio",
      "url": "https://pantom.digital"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pantom Digital Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pantom.digital/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://pantom.digital/blog/${post.slug}`
    }
  };

  return (
    <>
      <SEO
        title={`${post.title} | Blog Pantom Digital Studio`}
        description={post.description}
        ogImage={post.image}
        ogUrl={`https://pantom.digital/blog/${post.slug}`}
        canonicalUrl={`https://pantom.digital/blog/${post.slug}`}
        article={true}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        type="article"
        locale={locale === 'es' ? 'es_ES' : 'en_US'}
        alternateLocales={locale === 'es' ? ['en_US'] : ['es_ES']}
        structuredData={structuredData}
      />
      {/* Resto del contenido del blog */}
    </>
  );
} 