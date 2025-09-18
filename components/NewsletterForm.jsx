import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterForm({ dark = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const [consent, setConsent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación del consentimiento
    if (!consent) {
      setStatus({ loading: false, success: false, error: 'Debes aceptar la política de privacidad.' });
      return;
    }

    // Validación de campos
    if (!formData.email || !formData.name) {
      setStatus({ loading: false, success: false, error: 'Todos los campos son obligatorios.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: 'newsletter-form',
          tags: [],
          lang: 'es'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al suscribirse');
      }

      // Si llegamos aquí, la suscripción fue exitosa
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '' });
      setShowModal(true);
    } catch (error) {
      console.error('Newsletter error:', error);
      setStatus({ 
        loading: false, 
        success: false, 
        error: error.message || 'Error al procesar la suscripción' 
      });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    if (status.success) {
      const timer = setTimeout(() => setShowModal(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [status.success]);

  return (
    <div className={`${dark ? 'bg-[#1a1a1a]/50 border border-white/10 rounded-2xl p-8 backdrop-blur-sm text-white' : 'bg-white text-gray-900'} rounded-lg shadow-lg p-6 max-w-md mx-auto`}>
      <h3 className={`text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
        Suscríbete a nuestra Newsletter
      </h3>
      <p className={`mb-6 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
        Recibe las últimas noticias y actualizaciones sobre desarrollo web, SEO y tecnología.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${dark ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' : 'border-gray-300'}`}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${dark ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' : 'border-gray-300'}`}
            placeholder="tu@email.com"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
            required
            className="mr-2"
          />
          <label htmlFor="consent" className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700 dark:text-gray-200'}`}>
            He leído y acepto la <a href="/privacidad" target="_blank" className="text-[#ea5a19] underline">política de privacidad</a> y el uso de mis datos.
          </label>
        </div>

        {status.error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-700 p-4 rounded-lg"
          >
            {status.error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={status.loading}
          className={`w-full py-2 px-4 rounded-md transition-colors font-medium ${dark ? 'bg-primary text-white hover:bg-primary/90' : 'bg-blue-600 text-white hover:bg-blue-700'} ${status.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {status.loading ? 'Enviando...' : 'Suscribirse'}
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className={`${dark ? 'bg-[#1a1a1a] text-white' : 'bg-white'} rounded-xl shadow-xl p-8 max-w-sm w-full text-center`}>
            <h4 className="text-2xl font-bold mb-2" style={{ color: '#ea5a19' }}>¡Gracias por suscribirte!</h4>
            <p className={`${dark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Te mantendremos informado con las mejores novedades y recursos digitales.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-6 py-2 bg-[#ea5a19] text-white rounded-lg hover:bg-[#ff8f59] transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}