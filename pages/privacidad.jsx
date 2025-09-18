import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Head>
        <title>Política de Privacidad y Cookies | Pantom Estudio Digital</title>
        <meta name="description" content="Política de privacidad y cookies de Pantom Estudio Digital. Información sobre el uso de datos personales, newsletter, contacto y cookies." />
      </Head>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad y Cookies</h1>
        <p className="mb-4">En <strong>Pantom Estudio Digital</strong> nos comprometemos a proteger la privacidad de nuestros usuarios y clientes. Esta política explica cómo recopilamos, usamos y protegemos tus datos personales conforme a la Ley 1581 de 2012 (Colombia) y otras normativas aplicables.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Responsable del Tratamiento</h2>
        <p className="mb-4">Pantom Estudio Digital<br/>NIT: 901070278<br/>Email: info@pantom.net<br/>Tunja, Boyacá, Colombia</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Datos que Recopilamos</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Nombre y correo electrónico (formularios de contacto y newsletter)</li>
          <li>Información de navegación (cookies, dirección IP, analítica web)</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Finalidad del Tratamiento</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Responder solicitudes y consultas enviadas a través del formulario de contacto.</li>
          <li>Gestionar el envío de la newsletter y comunicaciones comerciales.</li>
          <li>Analizar el uso del sitio web para mejorar la experiencia del usuario.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Derechos de los Titulares</h2>
        <p className="mb-4">Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (ARCO) enviando un correo a <a href="mailto:info@pantom.net" className="text-[#ea5a19] underline">info@pantom.net</a>.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Cookies</h2>
        <p className="mb-4">Utilizamos cookies propias y de terceros para analizar la navegación y mejorar nuestros servicios. Puedes gestionar tus preferencias de cookies desde el banner de cookies o la configuración de tu navegador.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">6. Conservación de los Datos</h2>
        <p className="mb-4">Tus datos se conservarán mientras sean necesarios para la finalidad para la que fueron recogidos o hasta que solicites su supresión.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">7. Cambios en la Política</h2>
        <p className="mb-4">Nos reservamos el derecho de modificar esta política para adaptarla a novedades legislativas o cambios en nuestros procesos. Te recomendamos revisarla periódicamente.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">8. Contacto</h2>
        <p>Si tienes dudas sobre nuestra política de privacidad o el tratamiento de tus datos, escríbenos a <a href="mailto:info@pantom.net" className="text-[#ea5a19] underline">info@pantom.net</a>.</p>
      </main>
      <Footer />
    </div>
  );
} 