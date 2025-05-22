import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  // Verificar que la API key esté configurada
  if (!process.env.MAILERSEND_API_KEY) {
    console.error('Error: MAILERSEND_API_KEY no está configurada');
    return res.status(500).json({ 
      success: false, 
      error: 'Error de configuración: MAILERSEND_API_KEY no está configurada' 
    });
  }

  try {
    // Obtener información de la cuenta
    const response = await fetch('https://api.mailersend.com/v1/account', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MailerSend error:', data);
      return res.status(500).json({ 
        success: false, 
        error: data,
        message: 'Error al obtener información de la cuenta'
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: {
        email: data.data.email,
        domain: data.data.domain,
        plan: data.data.plan
      }
    });
  } catch (err) {
    console.error('Catch error:', err);
    return res.status(500).json({ 
      success: false, 
      error: err.message,
      message: 'Error interno del servidor al intentar obtener información de la cuenta'
    });
  }
} 