import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, Calendar, Send } from "lucide-react";
import { useState } from "react";

export default function Contacto() {
  const [status, setStatus] = useState(null);

  // Placeholder para el envío real
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("success");
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <Layout>
      <Head>
        <title>Contacto | Pantom - Estudio Digital en Tunja, Colombia</title>
        <meta
          name="description"
          content="Contacta a Pantom Estudio Digital en Tunja, Colombia. Formulario, email, teléfono y dirección para consultoría web, desarrollo y marketing digital." />
      </Head>
      <main className="bg-[#0a0a0a] min-h-screen pb-16">
        {/* Encabezado */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-8 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Hablemos: Contacta con Pantom Estudio Digital
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            ¿Tienes un proyecto en mente, una pregunta sobre nuestros servicios o simplemente quieres explorar cómo podemos colaborar? Nos encantaría escucharte. Completa el formulario o utiliza nuestros datos de contacto directo.
          </p>
        </section>

        {/* Sección principal de contacto */}
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Formulario */}
            <div className="bg-[#181818]/80 border border-white/10 rounded-2xl p-8 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-white mb-4">Envíanos un Mensaje</h2>
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo *</label>
                  <input type="text" id="nombre" name="nombre" required className="w-full rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-[#ea5a19]" placeholder="Tu nombre" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico *</label>
                  <input type="email" id="email" name="email" required className="w-full rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-[#ea5a19]" placeholder="tucorreo@email.com" />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
                  <input type="tel" id="telefono" name="telefono" className="w-full rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-[#ea5a19]" placeholder="+57 300 000 0000" />
                </div>
                <div>
                  <label htmlFor="servicio" className="block text-sm font-medium text-gray-300 mb-1">Asunto o Servicio de Interés *</label>
                  <select id="servicio" name="servicio" required className="w-full rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-[#ea5a19]">
                    <option value="">Selecciona una opción</option>
                    <option>Desarrollo Web</option>
                    <option>Bases de Datos</option>
                    <option>SEO</option>
                    <option>Estrategia Digital</option>
                    <option>Consulta General</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-300 mb-1">Mensaje *</label>
                  <textarea id="mensaje" name="mensaje" required rows={5} className="w-full rounded-lg bg-[#0a0a0a] border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-[#ea5a19] resize-none" placeholder="Cuéntanos sobre tu proyecto o consulta..." />
                </div>
                <div className="text-xs text-gray-400">
                  Al enviar, aceptas nuestra <Link href="/privacidad" className="underline hover:text-[#ea5a19]">Política de Privacidad</Link>.
                </div>
                {/* Aquí iría reCAPTCHA o similar */}
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#ea5a19] text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg mt-2">
                  <Send className="w-5 h-5" /> Enviar Mensaje
                </button>
                {status === "success" && <div className="text-green-400 text-sm mt-2">¡Mensaje enviado! Te responderemos pronto.</div>}
              </form>
            </div>
            {/* Información directa */}
            <div className="flex flex-col gap-8 justify-center">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Mail className="w-5 h-5 text-[#ea5a19]" /> Correo Electrónico</h3>
                <a href="mailto:victorhug1@hotmail.com" className="text-gray-300 hover:text-[#ea5a19] underline">victorhug1@hotmail.com</a>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Phone className="w-5 h-5 text-[#ea5a19]" /> Teléfonos</h3>
                <a href="tel:+573005384997" className="text-gray-300 hover:text-[#ea5a19] underline block">+57 300 5384997</a>
                <a href="tel:+573174031404" className="text-gray-300 hover:text-[#ea5a19] underline block">+57 317 4031404</a>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#ea5a19]" /> Ubicación</h3>
                <p className="text-gray-300">Calle 55 # 71d - 07<br />Barrio Normandia<br />Tunja, Boyacá, Colombia</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Calendar className="w-5 h-5 text-[#ea5a19]" /> ¿Prefieres agendar directamente?</h3>
                <a href="#" className="inline-flex items-center px-4 py-2 bg-[#181818] text-white font-semibold rounded-lg hover:bg-[#ea5a19] transition-colors border border-white/10">Agendar Consulta Online</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
} 