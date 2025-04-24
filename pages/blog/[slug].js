import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import Error from 'next/error';

export default function BlogPost({ post }) {
  const router = useRouter();
  const { locale } = router;

  // Si no hay post, mostrar error 404
  if (!post) {
    return <Error statusCode={404} />;
  }

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
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="prose prose-lg max-w-none">
            {post.content}
          </div>
        </article>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Por ahora, no generamos paths estáticos
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // Por ahora, retornamos null para evitar el error
  return {
    props: {
      post: null
    },
    revalidate: 60 // Revalidar cada minuto
  };
} 