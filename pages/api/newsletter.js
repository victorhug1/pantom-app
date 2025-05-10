import { handleNewsletterSubscription } from '../../lib/leadService';
import { logger } from '../../lib/logger';

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  // Asegurar que la respuesta siempre es JSON
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const { name, email } = req.body;
    logger.info('Datos recibidos en newsletter:', { name, email });

    // Validación básica
    if (!email || !name) {
      logger.warn('Validación fallida: campos requeridos faltantes');
      return res.status(400).json({ 
        success: false,
        message: 'Nombre y email son requeridos' 
      });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Validación fallida: formato de email inválido');
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    // Procesar la suscripción usando el nuevo servicio
    logger.info('Iniciando procesamiento de suscripción...');
    const lead = await handleNewsletterSubscription({
      nombre: name,
      email,
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
        userAgent: req.headers['user-agent'] || '',
        origen: 'web'
      }
    });

    logger.info('Suscripción procesada exitosamente:', { leadId: lead._id });

    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción exitosa'
    });

  } catch (error) {
    logger.error('Error en newsletter API:', error);
    // Asegurar que el error es serializable
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la suscripción',
      error: errorMessage
    });
  }
} 