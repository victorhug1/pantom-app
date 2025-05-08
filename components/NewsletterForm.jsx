import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setStatus({ loading: false, success: false, error: 'Debes aceptar la política de privacidad.' });
      return;
    }
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al suscribirse');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '' });
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Suscríbete a nuestra Newsletter
      </h3>
      <p className="text-gray-600 mb-6">
        Recibe las últimas actualizaciones sobre desarrollo web, SEO y tecnología.
      </p>

      {status.success ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-700 p-4 rounded-lg"
        >
          ¡Gracias por suscribirte! Te mantendremos informado.
        </motion.div>
      ) : (
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-200">
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
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
              status.loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {status.loading ? 'Enviando...' : 'Suscribirse'}
          </button>
        </form>
      )}
    </div>
  );
} 