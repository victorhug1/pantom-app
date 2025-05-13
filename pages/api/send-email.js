import clientPromise from '../../lib/mongodb';

// Configuración de MailerSend
const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const MAILERSEND_TEMPLATE_ID = process.env.MAILERSEND_TEMPLATE_ID;
const MAILERSEND_FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL;
const MAILERSEND_FROM_NAME = process.env.MAILERSEND_FROM_NAME;

// Validar configuración requerida
if (!MAILERSEND_API_KEY || !MAILERSEND_TEMPLATE_ID || !MAILERSEND_FROM_EMAIL || !MAILERSEND_FROM_NAME) {
  console.error('Error: Faltan variables de entorno de MailerSend');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  // Validar API key
  if (!MAILERSEND_API_KEY) {
    return res.status(500).json({ 
      success: false, 
      message: 'Error de configuración: API key no configurada' 
    });
  }

  try {
    const { leads, templateId = MAILERSEND_TEMPLATE_ID } = req.body;

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ success: false, message: 'Se requiere al menos un lead' });
    }

    // Validar límite de envíos por lote
    if (leads.length > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'El límite máximo de envíos por lote es 100' 
      });
    }

    // Conectar a MongoDB para verificar los leads
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('leads');

    // Verificar que los leads existan en la base de datos
    const emails = leads.map(lead => lead.email);
    const existingLeads = await collection.find({ email: { $in: emails } }).toArray();
    
    if (existingLeads.length === 0) {
      return res.status(404).json({ success: false, message: 'No se encontraron leads en la base de datos' });
    }

    // Preparar los emails para enviar
    const emailPromises = existingLeads.map(async (lead) => {
      try {
        const response = await fetch('https://api.mailersend.com/v1/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILERSEND_API_KEY}`
          },
          body: JSON.stringify({
            template_id: templateId,
            from: {
              email: MAILERSEND_FROM_EMAIL,
              name: MAILERSEND_FROM_NAME
            },
            to: [
              {
                email: lead.email,
                name: lead.nombre
              }
            ],
            subject: `Bienvenido a Pantom, ${lead.nombre}!`,
            variables: [
              {
                email: lead.email,
                substitutions: [
                  {
                    var: 'nombre',
                    value: lead.nombre
                  },
                  {
                    var: 'segmento',
                    value: lead.segmento
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Error al enviar email a ${lead.email}: ${error.message}`);
        }

        return {
          email: lead.email,
          status: 'success'
        };
      } catch (error) {
        console.error(`Error específico para ${lead.email}:`, error);
        throw error;
      }
    });

    // Ejecutar todos los envíos
    const results = await Promise.allSettled(emailPromises);
    
    // Procesar resultados
    const successful = results.filter(r => r.status === 'fulfilled').map(r => r.value);
    const failed = results.filter(r => r.status === 'rejected').map(r => r.reason);

    // Actualizar el estado de envío en la base de datos
    if (successful.length > 0) {
      await collection.updateMany(
        { email: { $in: successful.map(r => r.email) } },
        { 
          $set: { 
            lastEmailSent: new Date(),
            emailStatus: 'sent'
          }
        }
      );
    }

    // Actualizar estado de los fallidos
    if (failed.length > 0) {
      await collection.updateMany(
        { email: { $in: failed.map(r => r.message.split(' ')[4]) } },
        { 
          $set: { 
            emailStatus: 'failed',
            lastError: new Date()
          }
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Proceso de envío completado',
      results: {
        successful: successful.length,
        failed: failed.length,
        details: {
          successful,
          failed: failed.map(f => f.message)
        }
      }
    });

  } catch (error) {
    console.error('Error en el envío de emails:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
} 