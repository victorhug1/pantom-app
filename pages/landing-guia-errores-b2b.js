import Head from 'next/head';
import { Inter } from "next/font/google";
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function LandingGuiaErroresB2B() {
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', email: '', sitioWeb: '', auditoria: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // 1. Guardar lead en la DB
      const resLead = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          segmento: 'guia_errores_b2b',
          fuente: 'landing',
          notas: form.auditoria ? 'Solicita auditoría gratuita' : '',
          sitioWeb: form.sitioWeb,
        })
      });
      if (!resLead.ok) throw new Error('No se pudo guardar el lead');
      // 2. Notificar
      const resNotify = await fetch('/api/notify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          sitioWeb: form.sitioWeb,
          auditoria: form.auditoria,
        })
      });
      if (!resNotify.ok) throw new Error('No se pudo notificar al equipo');
      setForm({ nombre: '', email: '', sitioWeb: '', auditoria: false });
      router.push('/landing-guia-errores-b2b/gracias');
    } catch (err) {
      setError('Hubo un error. Intenta de nuevo o contáctanos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>7 errores silenciosos que frenan tu sitio B2B | Pantom</title>
        <meta name="description" content="Descubre los 7 errores más comunes que frenan el crecimiento de los sitios web B2B y aprende cómo solucionarlos en menos de una semana. Descarga la guía gratis de Pantom." />
      </Head>
      <div className={`${inter.className} min-h-screen bg-black text-white p-0 m-0 relative`}>
        {/* Background Hero igual que la landing anterior */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/background_pantom.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-background opacity-90" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-[0.15]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.1]" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/20 opacity-50" />
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] opacity-20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] opacity-20 animate-[spin_20s_linear_infinite_reverse]" />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12 relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src="/pantom_logo.svg" alt="Pantom" width={120} className="mx-auto" />
          </div>

          {/* Hero */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center leading-tight">
            ¿Estás cometiendo estos 7 errores que alejan clientes de tu sitio web?
          </h1>
          <p className="text-lg text-center mb-8 leading-relaxed">
            Aprende cómo detectarlos y corregirlos en menos de una semana, sin rehacer tu web.
          </p>

          {/* Mockup de la guía */}
          <div className="flex justify-center mb-10">
            <img src="/images/email/7-errores-silenciosos.png" alt="Mockup Guía 7 Errores Silenciosos" className="w-64 md:w-80 rounded-xl shadow-lg border border-white/10 bg-white/5" />
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center text-center backdrop-blur-sm">
              <AlertTriangle className="w-10 h-10 text-primary mb-3" />
              <span className="font-semibold">Detecta errores técnicos y estratégicos</span>
              <p className="text-gray-400 text-sm mt-2">Descubre qué está frenando tu sitio y cómo solucionarlo.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center text-center backdrop-blur-sm">
              <CheckCircle className="w-10 h-10 text-primary mb-3" />
              <span className="font-semibold">Checklist accionable</span>
              <p className="text-gray-400 text-sm mt-2">Aplica los cambios directamente en tu negocio.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center text-center backdrop-blur-sm">
              <Zap className="w-10 h-10 text-primary mb-3" />
              <span className="font-semibold">Soluciones rápidas y simples</span>
              <p className="text-gray-400 text-sm mt-2">No necesitas rehacer tu web para mejorar.</p>
            </div>
          </div>

          {/* Formulario de descarga */}
          <div className="bg-white/10 rounded-2xl p-8 mb-12 max-w-xl mx-auto backdrop-blur-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="w-full rounded px-4 py-2 bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tu nombre" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Correo electrónico</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded px-4 py-2 bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="tucorreo@empresa.com" required />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Sitio web <span className="text-gray-400 text-xs">(opcional)</span></label>
                <input type="url" name="sitioWeb" value={form.sitioWeb} onChange={handleChange} className="w-full rounded px-4 py-2 bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://tusitio.com" />
              </div>
              <div className="flex items-center mb-6">
                <input type="checkbox" id="auditoria" name="auditoria" checked={form.auditoria} onChange={handleChange} className="mr-2 accent-primary" />
                <label htmlFor="auditoria" className="text-sm">Quiero que me contacten para una revisión gratuita</label>
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg text-lg shadow-lg transition-colors disabled:opacity-60" disabled={loading}>
                {loading ? 'Enviando...' : '👉 Quiero mi guía gratis'}
              </button>
              {error && <div className="text-red-400 text-center mt-4">{error}</div>}
            </form>
          </div>

          {/* Sello de confianza */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="Sello" width={28} />
            <span className="text-primary font-semibold">200+ sitios B2B auditados en Latinoamérica</span>
          </div>

          {/* Testimonio */}
          <div className="bg-white/5 p-8 rounded-2xl mb-10 backdrop-blur-sm max-w-xl mx-auto">
            <blockquote className="m-0 p-0 border-none">
              <p className="text-lg italic mb-4 leading-relaxed">
                "Gracias a la guía de Pantom, detectamos errores que ni sabíamos que existían. En una semana, mejoramos la captación de leads."
              </p>
              <footer className="flex items-center gap-3 text-primary text-base mt-4">
                <img src="/images/clients/logo-ing-mas.png" alt="Logo ING MAS S.A.S." width={40} height={40} className="bg-white rounded p-1 shadow-md" />
                <div>
                  <strong>Mauricio G.</strong>, Director Comercial<br />
                  ING MAS S.A.S.
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="flex items-center w-full md:w-auto justify-center md:justify-start mb-4 md:mb-0">
                <a href="mailto:hola@pantom.net" className="flex items-center text-white no-underline text-base font-medium hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.879 1.795l-7.5 5.625a2.25 2.25 0 01-2.742 0l-7.5-5.625A2.25 2.25 0 012.25 6.993V6.75" />
                  </svg>
                  hola@pantom.net
                </a>
              </div>
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