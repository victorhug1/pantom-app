import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Calendar, User, Tag, Clock, Share2, ArrowRight } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import { useRouter } from "next/router";
import Error from "next/error";
import SEO from "@/components/SEO";
import BreadcrumbsJsonLd from "@/components/SEO/BreadcrumbsJsonLd";
import ArticleJsonLd from "@/components/SEO/ArticleJsonLd";

// Array de posts mock (igual que en blog.jsx)
const mockPosts = [
  {
    slug: "seo-2025-estrategias-clave",
    title: "SEO en 2025: Estrategias Clave para Destacar en un Entorno Digital en Constante Evolución",
    author: {
      name: "Víctor Hugo",
      url: "https://www.linkedin.com/in/victorhug1/",
      avatar: "/images/vito-vito.jpg",
      bio: "Fundador de Pantom. Apasionado por la tecnología, la estrategia y el desarrollo de soluciones digitales que generan impacto real."
    },
    date: "2024-06-10",
    updated: "2024-06-10",
    category: "SEO",
    tags: ["SEO 2025", "E-E-A-T", "IA", "Tendencias"],
    image: "/images/blog/seo/tendencias-en-desarrollo-web-para.webp",
    excerpt: "Descubre las tendencias SEO más importantes para 2025, cómo la IA, E-E-A-T y la experiencia de usuario transforman el posicionamiento web en Colombia.",
    content: `
      <h2>La Experiencia del Usuario (UX) Sigue Reinando (¡y con más fuerza!)</h2>
      <p>Google lo ha dicho y lo sigue demostrando: la experiencia del usuario es primordial. En 2025, esto se traduce en:<br/>
      <ul>
        <li><strong>Core Web Vitals Optimizados:</strong> La velocidad de carga, la interactividad y la estabilidad visual de tu sitio son factores de ranking directos. Un sitio lento o que "salta" mientras carga frustra al usuario y a Google.</li>
        <li><strong>Diseño Intuitivo y Navegación Clara:</strong> Los usuarios deben poder encontrar lo que buscan fácilmente, sin fricciones. Esto incluye un diseño responsive impecable, especialmente optimizado para móviles (Mobile-First).</li>
        <li><strong>Contenido Bien Estructurado:</strong> Títulos claros (H1, H2, H3), párrafos concisos, uso de listas y elementos visuales que faciliten la lectura y comprensión.</li>
      </ul>
      <h2>Contenido de Calidad Excepcional con E-E-A-T Reforzado</h2>
      <p>El mantra "el contenido es el rey" evoluciona. En 2025, no solo se trata de crear contenido, sino de que este demuestre:</p>
      <ul>
        <li><strong>E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness):</strong> Experiencia, Pericia, Autoridad y Confiabilidad. Google quiere mostrar resultados de fuentes que realmente sepan de lo que hablan y en las que se pueda confiar. Esto es especialmente crítico para nichos YMYL (Your Money Your Life).</li>
        <li><strong>Profundidad y Originalidad:</strong> Contenido que vaya más allá de lo superficial, que ofrezca perspectivas únicas y que realmente satisfaga la intención de búsqueda del usuario.</li>
        <li><strong>Multimedia y Formatos Diversos:</strong> Integrar videos, infografías, podcasts y otros formatos puede enriquecer la experiencia y mejorar el engagement.</li>
      </ul>
      <h2>La Inteligencia Artificial (IA) y el SEO: Una Sinergia Obligada</h2>
      <ul>
        <li><strong>Optimización para SGE (Search Generative Experience):</strong> Los resultados generados por IA en las SERPs están cambiando la forma en que los usuarios interactúan con la búsqueda. Es vital entender cómo tu contenido puede ser fuente para estas respuestas o destacar junto a ellas.</li>
        <li><strong>IA como Herramienta SEO:</strong> La IA puede potenciar tu estrategia ayudando en la investigación de palabras clave, análisis de la competencia, generación de ideas de contenido (siempre con revisión y toque humano) y optimización técnica.</li>
        <li><strong>Búsqueda por Voz y Visual:</strong> La IA impulsa estas modalidades de búsqueda. Optimizar para preguntas conversacionales y asegurar que tus imágenes estén bien descritas (alt text) y sean de calidad es cada vez más importante.</li>
      </ul>
      <h2>El SEO Técnico Sigue Siendo la Columna Vertebral</h2>
      <ul>
        <li><strong>Rastreabilidad e Indexación:</strong> Asegúrate de que Google pueda encontrar y entender todas tus páginas importantes fácilmente.</li>
        <li><strong>Datos Estructurados (Schema Markup):</strong> Proporcionar contexto explícito a los motores de búsqueda sobre tu contenido ayuda a que aparezcas con fragmentos enriquecidos y mejora tu visibilidad para la IA.</li>
        <li><strong>Seguridad (HTTPS) y Arquitectura Web Óptima:</strong> Un sitio seguro y bien organizado es fundamental.</li>
      </ul>
      <h2>SEO Local y la Búsqueda Hiper-Personalizada</h2>
      <ul>
        <li><strong>Google Business Profile (GBP) Optimizado:</strong> Mantener tu perfil de Google actualizado y completo es más importante que nunca.</li>
        <li><strong>Citaciones Locales y Contenido Geográficamente Relevante:</strong> Asegura tu presencia en directorios locales importantes y crea contenido que resuene con tu audiencia local.</li>
        <li><strong>Adaptación a la Personalización:</strong> Los motores de búsqueda intentan ofrecer resultados cada vez más personalizados. Tener una buena reputación online y contenido relevante para diferentes segmentos de tu audiencia puede ayudar.</li>
      </ul>
      <h2>Conclusión: El Futuro del SEO es Estratégico y Adaptativo</h2>
      <p>El SEO en 2025 es un ecosistema complejo que requiere una visión integral y la capacidad de adaptarse rápidamente. Ya no se trata de trucos o atajos, sino de construir una presencia online sólida, valiosa y centrada en el usuario.</p>
      <p>¿Listo para llevar tu estrategia SEO al siguiente nivel en 2025? Descubre nuestros <a href="/servicios/seo">servicios de SEO estratégico</a> o <a href="/contacto">agenda una consulta gratuita</a> con nuestro equipo.</p>
    `,
    readingTime: "6 min",
  },
  {
    slug: "bases-datos-medida-2025",
    title: "Más Allá del Almacenamiento: Por Qué una Base de Datos a Medida es Clave para tu Negocio en 2025",
    author: {
      name: "Víctor Hugo",
      url: "https://www.linkedin.com/in/victorhug1/",
      avatar: "/images/vito-vito.jpg",
      bio: "Fundador de Pantom. Apasionado por la tecnología, la estrategia y el desarrollo de soluciones digitales que generan impacto real."
    },
    date: "2024-06-11",
    updated: "2024-06-11",
    category: "Bases de Datos",
    tags: ["bases de datos a medida 2025", "soluciones de datos Colombia", "optimización de bases de datos", "seguridad de datos empresas", "diseño de bases de datos", "consultoría bases de datos Boyacá"],
    image: "/images/blog/base-de-datos/base-de-datos-2025.webp",
    excerpt: "Descubre por qué una base de datos a medida es la clave para la eficiencia, seguridad y crecimiento de tu empresa en 2025. Optimiza, integra y protege tus datos con soluciones personalizadas.",
    content: `<h2>Más Allá del Almacenamiento...</h2><p>En pleno 2025, es innegable: los datos son el motor que impulsa a las empresas más exitosas. ...</p>`,
    readingTime: "7 min",
  },
  {
    slug: "nextjs-2025-velocidad-seo-experiencia",
    title: "Next.js en 2025: Velocidad, SEO y Experiencia de Usuario para tu Éxito Digital",
    author: {
      name: "Víctor Hugo",
      url: "https://www.linkedin.com/in/victorhug1/",
      avatar: "/images/vito-vito.jpg",
      bio: "Fundador de Pantom. Apasionado por la tecnología, la estrategia y el desarrollo de soluciones digitales que generan impacto real."
    },
    date: "2024-06-12",
    updated: "2024-06-12",
    category: "Desarrollo Web",
    tags: ["Next.js 2025", "desarrollo web", "SEO", "React", "Colombia", "Boyacá"],
    image: "/images/blog/desarrollo/velocidad-seo-experiencia-usuario.webp",
    excerpt: "Descubre por qué Next.js es la mejor opción para el desarrollo web moderno en 2025: velocidad, SEO, experiencia de usuario y escalabilidad para tu negocio en Colombia.",
    content: `
      <h2>¿Qué es Next.js y Por Qué Debería Importarte?</h2>
      <p>En pocas palabras, Next.js es un framework construido sobre React (una de las bibliotecas de JavaScript más populares para construir interfaces de usuario) que simplifica y potencia el desarrollo de aplicaciones web modernas. Creado por Vercel, Next.js ofrece una estructura y un conjunto de herramientas que abordan muchos de los desafíos comunes del desarrollo web, permitiendo a equipos como el nuestro en <a href="/nosotros">Pantom</a> crear productos digitales superiores.</p>
      <h2>Ventaja Clave 1: Rendimiento Excepcional y Velocidad de Carga Fulminante</h2>
      <ul>
        <li><strong>Renderizado Híbrido:</strong> Ofrece flexibilidad con Server-Side Rendering (SSR), Static Site Generation (SSG) e Incremental Static Regeneration (ISR). Esto significa que tus páginas pueden cargarse increíblemente rápido, mejorando la percepción del usuario y cumpliendo con las exigentes <a href="https://web.dev/vitals/" target="_blank">Core Web Vitals</a> de Google.</li>
        <li><strong>Optimización Automática de Imágenes:</strong> Con el componente <code>next/image</code>, las imágenes se optimizan y se sirven en formatos modernos (como WebP) y con el tamaño adecuado para cada dispositivo, sin esfuerzo adicional.</li>
        <li><strong>Code Splitting y Lazy Loading:</strong> Solo se carga el código JavaScript necesario para la vista actual, y otros recursos se cargan "perezosamente" (cuando se necesitan), acelerando la carga inicial.</li>
      </ul>
      <h2>Ventaja Clave 2: SEO Potenciado desde el Corazón del Framework</h2>
      <ul>
        <li><strong>Indexación Amigable:</strong> Gracias al SSR y SSG, los motores de búsqueda como Google pueden rastrear e indexar tu contenido de manera más eficiente que con aplicaciones React puramente renderizadas en el cliente.</li>
        <li><strong>Gestión Sencilla de Metadatos:</strong> Facilita la personalización de meta tags (título, descripción), datos estructurados (Schema Markup) y otros elementos cruciales para el SEO en cada página.</li>
        <li><strong>Rutas Amigables:</strong> Su sistema de enrutamiento basado en el sistema de archivos crea URLs limpias y semánticas, preferidas por los motores de búsqueda.</li>
      </ul>
      <h2>Ventaja Clave 3: Experiencia de Desarrollo (DX) que Impulsa la Productividad</h2>
      <ul>
        <li><strong>Fast Refresh:</strong> Permite ver los cambios en el código reflejados instantáneamente en el navegador durante el desarrollo, sin perder el estado de la aplicación.</li>
        <li><strong>Sistema de Rutas Intuitivo:</strong> Crear nuevas páginas y rutas es tan simple como crear archivos y carpetas.</li>
        <li><strong>Excelente Soporte para TypeScript:</strong> Para proyectos que requieren mayor robustez y escalabilidad.</li>
        <li><strong>Ecosistema Vercel:</strong> La plataforma de despliegue Vercel (creadores de Next.js) ofrece una integración perfecta para despliegues continuos, funciones serverless y mucho más, simplificando enormemente la infraestructura.</li>
      </ul>
      <h2>Ventaja Clave 4: Escalabilidad y Flexibilidad para Proyectos de Cualquier Tamaño</h2>
      <ul>
        <li><strong>Versatilidad:</strong> Ideal para sitios estáticos, aplicaciones dinámicas, e-commerce, portales de contenido, dashboards interactivos y más.</li>
        <li><strong>Integraciones Fáciles:</strong> Se integra sin problemas con CMS Headless (como Strapi, Sanity, Contentful), APIs de terceros y diferentes backends.</li>
        <li><strong>Serverless Functions:</strong> Permite construir lógica backend (APIs) directamente dentro de tu proyecto Next.js, desplegándose como funciones serverless, ideal para la escalabilidad y costos optimizados.</li>
      </ul>
      <h2>Casos de Uso Ideales para Next.js en 2025</h2>
      <ul>
        <li>Sitios web corporativos y de marketing con enfoque en velocidad y SEO.</li>
        <li>Plataformas de E-commerce que requieren una experiencia de compra fluida y rápida.</li>
        <li>Aplicaciones web interactivas (SaaS, dashboards, herramientas internas).</li>
        <li>Blogs y sitios de contenido con gran cantidad de artículos (¡como el que estás leyendo!).</li>
        <li>Portales que necesitan manejar y mostrar grandes cantidades de datos de forma eficiente.</li>
      </ul>
      <h2>Pantom y Next.js: Tu Combinación para el Éxito Digital en Colombia</h2>
      <p>En <a href="/nosotros">Pantom Estudio Digital</a>, hemos adoptado Next.js como una de nuestras tecnologías predilectas para el desarrollo web. Su poder y flexibilidad nos permiten construir las soluciones personalizadas y de alto rendimiento que nuestros clientes en Tunja, Boyacá y toda Colombia necesitan para triunfar en 2025. Aprovechamos sus características para asegurar que tu proyecto no solo cumpla con tus expectativas, sino que las supere.</p>
      <h2>Conclusión: Una Apuesta Segura para el Futuro Web</h2>
      <p>Next.js no es solo una moda pasajera; es una tecnología que ha demostrado su valía y que continúa evolucionando para enfrentar los desafíos del desarrollo web moderno. Su enfoque en el rendimiento, SEO y la experiencia del desarrollador lo convierten en una elección estratégica y robusta para cualquier proyecto web que aspire a la excelencia en 2025.</p>
      <p>¿Tienes un proyecto en mente o quieres modernizar tu plataforma actual? <a href="/contacto">Hablemos de cómo Next.js y la experiencia de Pantom pueden ser la solución. Agenda tu consulta gratuita.</a></p>
    `,
    readingTime: "6 min",
  },
];

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  
  // ✅ VALIDACIÓN ANTI-SPAM INMEDIATA
  const spamWords = [
    'casino', 'bet', 'poker', 'gambling', 'bonus', 'jackpot', 'roulette', 
    'blackjack', 'slots', 'ggbet', 'slottica', 'pin-up', '1xbet',
    'oficjalna', 'strona', 'zaklady', 'sportowe', 'kasyno',
    'turkiye', 'giris', 'kazanin', 'telecharger', 'burkina', 'faso'
  ];
  
  // Verificar palabras clave spam
  if (slug && spamWords.some(word => slug.toLowerCase().includes(word.toLowerCase()))) {
    console.log(`🚨 SPAM BLOCKED IN BLOG: ${slug}`);
    return <Error statusCode={404} />;
  }
  
  // Validar que el slug sea válido
  if (!slug || typeof slug !== 'string' || !/^[a-zA-Z0-9-]+$/.test(slug)) {
    return <Error statusCode={404} />;
  }
  
  const post = mockPosts.find(p => p.slug === slug);
  
  // Si no se encuentra el post, devolver 404
  if (!post) {
    return <Error statusCode={404} />;
  }

  // Artículos relacionados: los otros dos artículos reales
  const relatedPosts = mockPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  // Compartir en redes
  const shareUrl = `https://pantom.net/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} | Blog Pantom`);
  const shareLinks = [
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${shareText}`,
      icon: <FaLinkedin className="w-7 h-7" />
    },
    {
      name: "X",
      url: `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
      icon: <FaXTwitter className="w-7 h-7" />
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: <FaFacebook className="w-7 h-7" />
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${shareText}-${encodeURIComponent(shareUrl)}`,
      icon: <FaWhatsapp className="w-7 h-7" />
    }
  ];

  return (
    <Layout>
      <BreadcrumbsJsonLd items={[
        { name: 'Inicio', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` },
      ]} />
      <ArticleJsonLd post={post} />
      <SEO
        title={`${post.title} | Blog Pantom`}
        description={post.excerpt}
        canonicalUrl={shareUrl}
        type="article"
        article={true}
        publishedTime={post.date}
        modifiedTime={post.updated}
      />
      <main className="bg-[#0a0a0a] min-h-screen pb-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 px-4 pt-16 pb-8">
          {/* Contenido principal */}
          <article className="w-full lg:w-2/3 mx-auto lg:mx-0">
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

            {/* Breadcrumbs */}
            <div className="mb-6 text-sm text-gray-400 flex items-center gap-2">
              <Link href="/blog" className="hover:text-[#ea5a19] underline">Blog</Link>
              <span>/</span>
              <span className="text-white font-semibold">{post.title}</span>
            </div>

            {/* Contenido principal */}
            <div className="prose prose-invert max-w-none text-lg leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Compartir */}
            <div className="mb-12">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Share2 className="w-5 h-5 text-[#ea5a19]" /> Compartir este artículo</h3>
              <div className="flex gap-4">
                {shareLinks.map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={`Compartir en ${link.name}`} className="hover:scale-110 transition-transform bg-[#181818] p-2 rounded-full border border-white/10 flex items-center justify-center">
                    {link.icon}
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

          {/* Sidebar solo en desktop */}
          <aside className="hidden lg:block w-1/3">
            <div className="sticky top-32 flex flex-col gap-8">
              {/* CTA */}
              <div className="bg-[#181818]/90 border border-white/10 rounded-2xl p-6 mb-4">
                <h3 className="text-lg font-bold text-white mb-2">¿Quieres mejorar tu SEO?</h3>
                <p className="text-gray-300 mb-4">Agenda una consulta gratuita con nuestro equipo y descubre cómo podemos ayudarte a destacar en Google.</p>
                <Link href="/contacto" className="inline-block px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors">Agendar Consulta</Link>
              </div>
              {/* Enlaces internos */}
              <div className="bg-[#181818]/90 border border-white/10 rounded-2xl p-6">
                <h4 className="text-md font-bold text-white mb-3">Enlaces útiles</h4>
                <ul className="flex flex-col gap-2">
                  <li><Link href="/servicios/seo" className="text-[#ea5a19] hover:underline">Servicios SEO</Link></li>
                  <li><Link href="/servicios/desarrollo-web" className="text-[#ea5a19] hover:underline">Desarrollo Web</Link></li>
                  <li><Link href="/blog/automatizacion-negocios-digitales" className="text-[#ea5a19] hover:underline">IA y Automatización</Link></li>
                  <li><Link href="/contacto" className="text-[#ea5a19] hover:underline">Contacto</Link></li>
                </ul>
              </div>
              {/* Redes sociales */}
              <div className="bg-[#181818]/90 border border-white/10 rounded-2xl p-6">
                <h4 className="text-md font-bold text-white mb-3">Síguenos</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/pantom-digital-studio/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:scale-110 transition-transform bg-[#181818] p-2 rounded-full border border-white/10 flex items-center justify-center">
                    <FaLinkedin className="w-7 h-7" />
                  </a>
                  <a href="https://x.com/pantomdigital" target="_blank" rel="noopener noreferrer" title="X" className="hover:scale-110 transition-transform bg-[#181818] p-2 rounded-full border border-white/10 flex items-center justify-center">
                    <FaXTwitter className="w-7 h-7" />
                  </a>
                  <a href="https://www.facebook.com/pantomdigital" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:scale-110 transition-transform bg-[#181818] p-2 rounded-full border border-white/10 flex items-center justify-center">
                    <FaFacebook className="w-7 h-7" />
                  </a>
                  <a href="https://wa.me/573005384997" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:scale-110 transition-transform bg-[#181818] p-2 rounded-full border border-white/10 flex items-center justify-center">
                    <FaWhatsapp className="w-7 h-7" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
} 