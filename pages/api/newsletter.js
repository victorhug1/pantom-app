import { handleNewsletterSubscription } from '../../lib/leadService';

export default async function handler(req, res) {
  console.log('Newsletter API called:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const { name, email } = req.body;
    console.log('Datos recibidos:', { name, email });

    // Validación básica
    if (!email || !name) {
      console.log('Validación fallida: campos requeridos faltantes');
      return res.status(400).json({ 
        success: false,
        message: 'Nombre y email son requeridos' 
      });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validación fallida: formato de email inválido');
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    // Procesar la suscripción usando el nuevo servicio
    const lead = await handleNewsletterSubscription({
      nombre: name,
      email,
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
        userAgent: req.headers['user-agent'] || '',
        origen: 'web'
      }
    });

    console.log('Suscripción procesada exitosamente:', lead._id);

    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción exitosa'
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la suscripción',
      error: error.message
    });
  }
} 