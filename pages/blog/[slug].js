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

  // Verificar que todas las propiedades necesarias existan
  if (!post.title || !post.description || !post.content) {
    return <Error statusCode={404} />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image || 'https://pantom.digital/logo.png',
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
    "datePublished": post.publishedAt || new Date().toISOString(),
    "dateModified": post.updatedAt || new Date().toISOString(),
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
        ogImage={post.image || 'https://pantom.digital/logo.png'}
        ogUrl={`https://pantom.digital/blog/${post.slug}`}
        canonicalUrl={`https://pantom.digital/blog/${post.slug}`}
        article={true}
        publishedTime={post.publishedAt || new Date().toISOString()}
        modifiedTime={post.updatedAt || new Date().toISOString()}
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
  try {
    // Por ahora, retornamos un objeto post con valores por defecto
    return {
      props: {
        post: {
          title: 'Título del Post',
          description: 'Descripción del post',
          content: 'Contenido del post',
          slug: params.slug,
          image: 'https://pantom.digital/logo.png',
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      revalidate: 60 // Revalidar cada minuto
    };
  } catch (error) {
    return {
      props: {
        post: null
      },
      revalidate: 60
    };
  }
} 