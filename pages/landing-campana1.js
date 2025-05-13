import Head from 'next/head';
import Image from 'next/image';
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function LandingCampana1({ representante_legal }) {
  return (
    <>
      <Head>
        <title>¿Tu presencia digital está haciendo crecer tu negocio? | Pantom</title>
        <meta name="description" content="Más del 70% de las PyMEs tienen presencia online, pero menos del 10% la usan estratégicamente. Descubre cómo convertir tu ecosistema digital en una herramienta real de ventas." />
      </Head>
      <div className={`${inter.className} min-h-screen bg-black text-white p-0 m-0 relative`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background_pantom.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Base overlay */}
          <div className="absolute inset-0 bg-background opacity-90" />
          
          {/* Tech pattern overlay */}
          <div className="absolute inset-0">
            {/* Grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-[0.15]" />
            
            {/* Dots pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.1]" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-50" />
            
            {/* Animated circles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] opacity-20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] opacity-20 animate-[spin_20s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>

        <div className="max-w-[800px] mx-auto px-4 py-8 relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src="/pantom_logo.svg" alt="Pantom" width={140} className="mx-auto" />
          </div>

          {/* H1 Principal */}
          <h1 className="text-3xl font-bold mb-6 text-center leading-tight">
            ¿Tu presencia digital está haciendo crecer tu negocio o solo ocupa espacio?
          </h1>

          {/* Subtítulo */}
          <p className="text-lg text-center mb-10 leading-relaxed">
            Más del 70% de las PyMEs tienen presencia online, pero menos del 10% la usan estratégicamente para atraer clientes o generar oportunidades reales.
          </p>

          {/* ¿Te suena familiar? */}
          <div className="bg-white/5 p-8 rounded-2xl mb-10 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              ¿Te suena familiar?
            </h2>
            <ul className="text-base leading-relaxed list-none p-0 m-0">
              <li className="mb-4"><span className="text-primary text-lg">•</span> Tienes una web bonita, pero no sabes si realmente convierte.</li>
              <li className="mb-4"><span className="text-primary text-lg">•</span> Publicas en redes, pero no sabes si llega al público correcto.</li>
              <li className="mb-4"><span className="text-primary text-lg">•</span> Tu competencia parece "estar en todas partes" y tú no.</li>
              <li><span className="text-primary text-lg">•</span> Has invertido tiempo y dinero… pero sin resultados claros.</li>
            </ul>
          </div>

          {/* Te ayudamos a cambiar eso */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Te ayudamos a cambiar eso.
            </h2>
            <p className="text-lg text-center leading-relaxed">
              En <strong>Pantom</strong>, combinamos estrategia, diseño y tecnología para convertir tu ecosistema digital en una herramienta real de ventas.<br />
              No hacemos "páginas bonitas": construimos activos que trabajan por tu negocio.
            </p>
          </div>

          {/* ¿Qué hacemos diferente? */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              ¿Qué hacemos diferente?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">Desarrollo web a medida</h3>
                <p className="text-gray-400">Rápido y escalable con Next.js</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">SEO técnico + contenido</h3>
                <p className="text-gray-400">Posicionamiento natural</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">Inteligencia de datos</h3>
                <p className="text-gray-400">Entiende a tus clientes reales</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-3">Consultoría estratégica</h3>
                <p className="text-gray-400">Decisiones con foco</p>
              </div>
            </div>
          </div>

          {/* Testimonio */}
          <div className="bg-white/5 p-8 rounded-2xl mb-10 backdrop-blur-sm">
            <blockquote className="m-0 p-0 border-none">
              <p className="text-lg italic mb-4 leading-relaxed">
                "Antes pensábamos que teníamos todo bien. Pantom nos mostró lo que realmente necesitábamos. En 3 meses, multiplicamos las oportunidades de contacto."
              </p>
              <footer className="flex items-center gap-3 text-primary text-base mt-4">
                <img src="/images/clients/logo-ing-mas.png" alt="Logo ING MAS S.A.S." width={48} height={48} className="bg-white rounded p-1 shadow-md" />
                <div>
                  <strong>Mauricio G.</strong>, Director Comercial<br />
                  ING MAS S.A.S.
                </div>
              </footer>
            </blockquote>
          </div>

          {/* CTA Principal */}
          <div className="text-center my-10">
            <h2 className="text-2xl font-semibold mb-6">
              ¿Quieres descubrir cómo lo hacemos?
            </h2>
            <a href="https://pantom.net/contacto" 
               className="bg-primary hover:bg-primary-hover text-white no-underline py-4 px-8 rounded-lg text-lg font-bold inline-block tracking-wider shadow-lg transition-colors">
              👉 Agenda una llamada rápida con un experto
            </a>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              {/* Email a la izquierda */}
              <div className="flex items-center w-full md:w-auto justify-center md:justify-start mb-4 md:mb-0">
                <a href="mailto:hola@pantom.net" className="flex items-center text-white no-underline text-base font-medium hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.879 1.795l-7.5 5.625a2.25 2.25 0 01-2.742 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75" />
                  </svg>
                  hola@pantom.net
                </a>
              </div>
              {/* Redes sociales a la derecha */}
              <div className="w-full md:w-auto flex flex-col items-center md:items-end">
                <span className="text-gray-400 text-sm mb-2">Síguenos</span>
                <div className="flex items-center">
                  <a href="https://www.facebook.com/pantomdigitalstudio/" className="inline-block mx-2" aria-label="Facebook">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width={24} className="align-middle" />
                  </a>
                  <a href="https://www.instagram.com/pantom_seo/" className="inline-block mx-2" aria-label="Instagram">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" width={24} className="align-middle" />
                  </a>
                  <a href="https://linkedin.com/company/pantom/" className="inline-block mx-2" aria-label="LinkedIn">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" width={24} className="align-middle" />
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm m-0 text-center mt-8">
              &copy; {new Date().getFullYear()} Pantom Digital Studio. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// Para Next.js: obtener el nombre del representante legal desde query string
export async function getServerSideProps(context) {
  const { representante_legal } = context.query;
  return { props: { representante_legal: representante_legal || null } };
} 