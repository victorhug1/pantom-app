import { handleContactForm } from '../../lib/leadService';
import { logger } from '../../lib/logger';

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
    const { nombre, email, mensaje, telefono = '', origen = '', etiquetas = [] } = req.body;
    logger.info('Datos recibidos en contacto:', { nombre, email, telefono, origen, etiquetas });

    // Validación de campos requeridos
    if (!nombre || !email || !mensaje) {
      logger.warn('Validación fallida: campos requeridos faltantes');
      return res.status(400).json({ 
        success: false,
        message: 'Nombre, email y mensaje son obligatorios' 
      });
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Validación fallida: formato de email inválido');
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    // Validación de longitud del mensaje
    if (mensaje.length < 10) {
      logger.warn('Validación fallida: mensaje demasiado corto');
      return res.status(400).json({
        success: false,
        message: 'El mensaje debe tener al menos 10 caracteres'
      });
    }

    // Procesar el formulario de contacto usando el nuevo servicio
    const lead = await handleContactForm({
      nombre,
      email,
      telefono,
      mensaje,
      etiquetas: [...etiquetas, 'contacto_web'],
      metadata: {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
        userAgent: req.headers['user-agent'] || '',
        origen,
        mensaje
      }
    });

    logger.info('Formulario de contacto procesado exitosamente:', { leadId: lead._id });

    return res.status(200).json({ 
      success: true, 
      message: 'Mensaje guardado correctamente',
      data: { leadId: lead._id }
    });

  } catch (error) {
    logger.error('Error en contacto API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
} 