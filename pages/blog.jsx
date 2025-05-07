import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

// Datos mock para artículos (reemplazar por fetch a CMS o API real)
const mockPosts = [
  {
    slug: "seo-2025-estrategias-clave",
    title: "SEO en 2025: Estrategias Clave para Destacar en un Entorno Digital en Constante Evolución",
    excerpt: "Descubre las tendencias SEO más importantes para 2025, cómo la IA, E-E-A-T y la experiencia de usuario transforman el posicionamiento web en Colombia.",
    date: "2024-06-10",
    author: "Víctor Hugo",
    category: "SEO",
    image: "/images/blog/seo/Tendencias en Desarrollo Web para 2024-1.webp"
  },
  {
    slug: "bases-datos-medida-2025",
    title: "Más Allá del Almacenamiento: Por Qué una Base de Datos a Medida es Clave para tu Negocio en 2025",
    excerpt: "Descubre por qué una base de datos a medida es la clave para la eficiencia, seguridad y crecimiento de tu empresa en 2025. Optimiza, integra y protege tus datos con soluciones personalizadas.",
    date: "2024-06-11",
    author: "Víctor Hugo",
    category: "Bases de Datos",
    image: "/images/blog/base de datos/Por Qué una Base de Datos a Medida es Clave para tu Negocio en 2025.png"
  },
  {
    slug: "nextjs-2025-velocidad-seo-experiencia",
    title: "Next.js en 2025: Velocidad, SEO y Experiencia de Usuario para tu Éxito Digital",
    excerpt: "Descubre por qué Next.js es la mejor opción para el desarrollo web moderno en 2025: velocidad, SEO, experiencia de usuario y escalabilidad para tu negocio en Colombia.",
    date: "2024-06-12",
    author: "Víctor Hugo",
    category: "Desarrollo Web",
    image: "/images/blog/desarrollo/Velocidad SEO y Experiencia de Usuario para tu Éxito Digital.png"
  },
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const postsPerPage = 6;

  // Filtrado por búsqueda
  const filteredPosts = mockPosts.filter(
    post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <Layout>
      <Head>
        <title>Blog | Pantom - Tecnología y Estrategia Digital en Colombia</title>
        <meta
          name="description"
          content="Blog de Pantom: artículos, guías y análisis sobre desarrollo web, SEO, estrategia digital y tecnología en Colombia." />
      </Head>
      <main className="bg-[#0a0a0a] min-h-screen pb-16">
        {/* Encabezado */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Blog Pantom: Ideas sobre Tecnología y Estrategia Digital
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Explora nuestros artículos, guías y análisis sobre las últimas tendencias en desarrollo web, gestión de datos, SEO, estrategias digitales y el mundo de la tecnología.
          </p>
          {/* Barra de búsqueda */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                className="w-full rounded-lg bg-[#181818] border border-white/10 text-white px-4 py-2 pl-10 focus:outline-none focus:border-[#ea5a19]"
                placeholder="Buscar artículos..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Listado de artículos */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.length === 0 ? (
              <p className="text-gray-400 col-span-full text-center">No se encontraron artículos.</p>
            ) : (
              paginatedPosts.map(post => (
                <article key={post.slug} className="bg-[#181818]/80 border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={`Miniatura del artículo: ${post.title}`}
                      width={600}
                      height={340}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs text-[#ea5a19] font-semibold mb-2 uppercase tracking-wide">{post.category}</span>
                    <Link href={`/blog/${post.slug}`} className="text-white font-semibold text-xl mt-2 hover:text-[#ea5a19]">
                      {post.title}
                    </Link>
                    <p className="text-gray-300 mt-2">{post.excerpt}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}