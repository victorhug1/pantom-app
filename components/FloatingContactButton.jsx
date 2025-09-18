import { useState } from "react";
import { MessageCircle, X, PhoneCall } from "lucide-react";

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <button
        className="fixed z-50 bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
        onClick={() => setOpen(true)}
        aria-label="Contacto rápido"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Popup modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 backdrop-blur-sm">
          <div className="bg-[#181818] rounded-2xl shadow-2xl p-8 m-6 max-w-xs w-full relative animate-fadeInUp">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">¿En qué podemos ayudarte?</h3>
              <p className="text-gray-300 text-sm mb-4">Nuestro equipo responderá lo antes posible.</p>
            </div>
            <a
              href="https://wa.me/573005384997"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors mb-2"
            >
              <PhoneCall className="w-5 h-5" /> WhatsApp
            </a>
            {/* Aquí puedes agregar más opciones de contacto si lo deseas */}
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
} 