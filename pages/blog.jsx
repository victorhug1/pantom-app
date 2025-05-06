import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";

// Datos mock para artículos (reemplazar por fetch a CMS o API real)
const mockPosts = [
  {
    slug: "tendencias-desarrollo-web-2024",
    title: "Tendencias en Desarrollo Web para 2024",
    excerpt: "Descubre las tecnologías y enfoques que marcarán el desarrollo web este año: frameworks, performance, accesibilidad y más.",
    date: "2024-05-01",
    author: "Víctor Hugo",
    category: "Desarrollo Web",
    image: "/images/blog/tendencias-web-2024.jpg"
  },
  {
    slug: "seo-para-pymes-colombia",
    title: "SEO para PYMES en Colombia: Guía Práctica",
    excerpt: "Estrategias y consejos para mejorar el posicionamiento web de pequeñas y medianas empresas en el mercado colombiano.",
    date: "2024-04-20",
    author: "Equipo Pantom",
    category: "SEO",
    image: "/images/blog/seo-pymes.jpg"
  },
  {
    slug: "automatizacion-negocios-digitales",
    title: "Automatización de Procesos en Negocios Digitales",
    excerpt: "Cómo la automatización puede optimizar operaciones, ahorrar tiempo y potenciar el crecimiento de tu empresa.",
    date: "2024-03-15",
    author: "Víctor Hugo",
    category: "Estrategia Digital",
    image: "/images/blog/automatizacion-negocios.jpg"
  },
  // ...más artículos
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
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#ea5a19]">
                      <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h2>
                    </Link>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-gray-400">{post.date} • {post.author}</span>
                      <Link href={`/blog/${post.slug}`} className="text-[#ea5a19] text-sm font-medium flex items-center gap-1 hover:underline">Leer Más <ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                className="px-3 py-1 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >Anterior</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-lg border border-white/10 text-white transition-colors text-sm font-medium ${page === i + 1 ? 'bg-[#ea5a19] text-white' : 'hover:bg-white/10'}`}
                  onClick={() => setPage(i + 1)}
                >{i + 1}</button>
              ))}
              <button
                className="px-3 py-1 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >Siguiente</button>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
} 