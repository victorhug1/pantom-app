export default function Gracias() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Imagen principal */}
      <img src="/images/landing/agradecimiento-pantom.png" alt="Gracias Pantom" className="w-64 md:w-80 mb-8 rounded-xl shadow-lg border border-white/10 bg-white/5" />
      <h1 className="text-3xl font-bold mb-4 text-center">¡Gracias por tu interés!</h1>
      <p className="mb-6 text-center max-w-xl">
        Te hemos enviado la guía a tu correo y pronto te contactaremos para tu auditoría gratuita.<br/>
        Si no la ves en tu bandeja de entrada, revisa tu carpeta de spam o promociones.
      </p>
      <a
        href="/recursos/Checklist-Estrategica-Digital.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-colors"
      >
        📥 Descargar Guía PDF
      </a>
      <p className="mt-8 text-gray-400 text-center">
        ¿Tienes dudas? Escríbenos a <a href="mailto:hola@pantom.net" className="underline">hola@pantom.net</a>
      </p>
    </div>
  );
} 