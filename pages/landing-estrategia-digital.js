import Head from 'next/head';
import { Inter } from "next/font/google";
import { CheckCircle, Calendar, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function LandingEstrategiaDigital() {
  return (
    <>
      <Head>
        <title>Tu estrategia digital comienza aquí | Pantom</title>
        <meta name="description" content="En solo 20 minutos te mostramos cómo mejorar tus resultados digitales sin fórmulas mágicas. Soluciones reales, para negocios reales." />
      </Head>
      <div className={`${inter.className} min-h-screen bg-black text-white p-0 m-0 relative`}>
        {/* Background con patrón y gradiente */}
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
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src="/pantom_logo.svg" alt="Pantom" width={120} className="mx-auto" />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Tu estrategia digital comienza aquí
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              En solo 20 minutos te mostramos cómo mejorar tus resultados digitales sin fórmulas mágicas. Soluciones reales, para negocios reales.
            </p>
          </div>

          {/* Mockup de Dashboard */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="/images/dashboard-mockup.png" 
                alt="Dashboard Pantom" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Plan digital 100% adaptado</h3>
              <p className="text-gray-400">Estrategias personalizadas para tu negocio</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aumento de visibilidad SEO</h3>
              <p className="text-gray-400">Mejora tu posicionamiento en buscadores</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Webs funcionales y potentes</h3>
              <p className="text-gray-400">Diseñadas para convertir visitas en ventas</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
              <CheckCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automatización inteligente</h3>
              <p className="text-gray-400">Optimiza tus procesos comerciales</p>
            </div>
          </div>

          {/* Testimonios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
              <blockquote className="m-0">
                <p className="text-lg italic mb-4">
                  "Duplicamos nuestras conversiones en 3 meses gracias al equipo de Pantom."
                </p>
                <footer className="flex items-center gap-3">
                  <img src="/images/logo-educativo.png" alt="Logo Cliente" width={40} height={40} className="bg-white rounded p-1" />
                  <div>
                    <strong>Santiago V.</strong>, CEO<br />
                    <span className="text-gray-400">Industria educativa</span>
                  </div>
                </footer>
              </blockquote>
            </div>
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
              <blockquote className="m-0">
                <p className="text-lg italic mb-4">
                  "Nos ayudaron a ver lo que no estábamos midiendo. Hoy vendemos más, con menos inversión."
                </p>
                <footer className="flex items-center gap-3">
                  <img src="/images/logo-moda.png" alt="Logo Cliente" width={40} height={40} className="bg-white rounded p-1" />
                  <div>
                    <strong>Laura R.</strong>, Líder de marketing<br />
                    <span className="text-gray-400">Ecommerce moda</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* CTA Principal */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold mb-6">
              👉 ¿Querés una estrategia digital con impacto real?
            </h2>
            <a 
              href="https://calendly.com/digitalstudiopantom"
              className="inline-block bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-colors"
            >
              Agendar mi asesoría gratuita
            </a>
          </div>

          {/* Contacto Alternativo */}
          <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm text-center">
            <h3 className="text-xl font-semibold mb-4">¿Prefieres otro canal?</h3>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <a 
                href="mailto:hola@pantom.net"
                className="flex items-center justify-center gap-2 text-white hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                hola@pantom.net
              </a>
              <a 
                href="https://wa.me/573002123456"
                className="flex items-center justify-center gap-2 text-white hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                +57 300 212 3456
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 Pantom Digital Studio. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </>
  );
} 