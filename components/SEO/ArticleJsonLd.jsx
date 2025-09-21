import Head from "next/head";

export default function ArticleJsonLd({ post }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image ? `https://pantom.net${post.image}` : undefined,
    "author": { 
      "@type": "Person", 
      "name": post.author?.name || "Pantom Team",
      ...(post.author?.url && { "url": post.author.url })
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pantom Digital Studio",
      "logo": { 
        "@type": "ImageObject", 
        "url": "https://pantom.net/pantom_logo.svg" 
      }
    },
    "datePublished": post.datePublished || post.date,
    "dateModified": post.dateModified || post.datePublished || post.date,
    "mainEntityOfPage": { 
      "@type": "WebPage", 
      "@id": `https://pantom.net/blog/${post.slug}` 
    },
    ...(post.category && { "articleSection": post.category }),
    ...(post.tags && { "keywords": post.tags.join(", ") })
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </Head>
  );
}
