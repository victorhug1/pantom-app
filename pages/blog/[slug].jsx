import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Calendar, User, Tag, Clock, Share2, ArrowRight } from "lucide-react";

// Mock de datos de un post (en producción, obtén esto por getStaticProps/getServerSideProps)
const mockPost = {
  title: "Tendencias en Desarrollo Web para 2024",
  slug: "tendencias-desarrollo-web-2024",
  author: {
    name: "Víctor Hugo",
    url: "https://www.linkedin.com/in/victorhug1/",
    avatar: "/images/equipo/victor.jpg",
    bio: "Fundador de Pantom. Apasionado por la tecnología, la estrategia y el desarrollo de soluciones digitales que generan impacto real."
  },
  date: "2024-05-01",
  updated: "2024-05-01",
  category: "Desarrollo Web",
  tags: ["React", "Next.js", "Tendencias"],
  image: "/images/blog/tendencias-web-2024.jpg",
  excerpt: "Descubre las tecnologías y enfoques que marcarán el desarrollo web este año: frameworks, performance, accesibilidad y más.",
  content: `
    <h2>Nuevas tecnologías y frameworks</h2>
    <p>El ecosistema de desarrollo web sigue evolucionando rápidamente. En 2024, frameworks como <strong>Next.js</strong> y <strong>Remix</strong> ganan protagonismo por su enfoque en performance y experiencia de usuario.</p>
    <h3>Performance y accesibilidad</h3>
    <p>La optimización de Core Web Vitals y la accesibilidad serán aún más importantes. Herramientas como <code>lighthouse</code> y <code>axe</code> ayudan a auditar y mejorar estos aspectos.</p>
    <blockquote>"La web debe ser accesible para todos, en cualquier dispositivo."</blockquote>
    <ul>
      <li>Server Components en React</li>
      <li>Edge Functions y SSR</li>
      <li>Automatización con IA</li>
    </ul>
    <p>¿Quieres saber cómo aplicar estas tendencias en tu proyecto? <a href="/contacto">Contáctanos</a>.</p>
  `,
  readingTime: "4 min",
};

// Mock de artículos relacionados
const relatedPosts = [
  {
    slug: "automatizacion-negocios-digitales",
    title: "Automatización de Procesos en Negocios Digitales",
    image: "/images/blog/automatizacion-negocios.jpg"
  },
  {
    slug: "seo-para-pymes-colombia",
    title: "SEO para PYMES en Colombia: Guía Práctica",
    image: "/images/blog/seo-pymes.jpg"
  }
];

export default function BlogPost() {
  const post = mockPost;

  // Compartir en redes
  const shareUrl = `https://pantom.net/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} | Blog Pantom`);
  const shareLinks = [
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${shareText}`,
      icon: "/icons/linkedin.svg"
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
      icon: "/icons/twitter.svg"
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: "/icons/facebook.svg"
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`,
      icon: "/icons/whatsapp.svg"
    }
  ];

  return (
    <Layout>
      <Head>
        <title>{post.title} | Blog Pantom</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title + ' | Blog Pantom'} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title + ' | Blog Pantom'} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Head>
      <main className="bg-[#0a0a0a] min-h-screen pb-16">
        <article className="max-w-3xl mx-auto px-4 pt-16 pb-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-4">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />
                {post.author.url ? (
                  <a href={post.author.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#ea5a19] underline">{post.author.name}</a>
                ) : post.author.name}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
              <span className="flex items-center gap-1"><Tag className="w-4 h-4" />{post.category}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readingTime}</span>
            </div>
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-6">
              <Image
                src={post.image}
                alt={`Imagen destacada del artículo: ${post.title}`}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </header>

          {/* Contenido principal */}
          <div className="prose prose-invert max-w-none text-lg leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Compartir */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Share2 className="w-5 h-5 text-[#ea5a19]" /> Compartir este artículo</h3>
            <div className="flex gap-4">
              {shareLinks.map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={`Compartir en ${link.name}`} className="hover:scale-110 transition-transform">
                  <img src={link.icon} alt={link.name} className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

          {/* Autor */}
          <div className="flex items-center gap-4 mb-16 bg-[#181818]/80 border border-white/10 rounded-2xl p-4">
            <Image src={post.author.avatar} alt={post.author.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover" />
            <div>
              <p className="text-white font-semibold mb-1">{post.author.name}</p>
              <p className="text-gray-400 text-sm">{post.author.bio}</p>
            </div>
          </div>

          {/* Artículos relacionados */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6">También te podría interesar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="bg-[#181818]/80 border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={rp.image}
                      alt={`Miniatura del artículo: ${rp.title}`}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#ea5a19]">{rp.title}</h4>
                    <span className="text-[#ea5a19] text-xs font-medium flex items-center gap-1">Leer Más <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>
    </Layout>
  );
} 