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

  const client = await clientPromise;
  const db = client.db('pantom-app');
  const leadsCollection = db.collection('leads');
  const notificationsCollection = db.collection('notifications');

  try {
    const { leadId, campaignId } = req.body;

    // Obtener el lead
    const lead = await leadsCollection.findOne({ _id: leadId });
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead no encontrado' });
    }

    // Obtener la campaña si existe
    let campaign = null;
    if (campaignId) {
      campaign = await db.collection('campaigns').findOne({ _id: campaignId });
    }

    // Preparar el email
    const emailData = {
      sender: {
        name: "Pantom",
        email: "noreply@pantom.com"
      },
      to: [
        {
          name: lead.nombre,
          email: lead.email
        }
      ],
      subject: campaign ? campaign.asunto : "Bienvenido a Pantom",
      html: campaign ? campaign.contenido : `
        <h1>Bienvenido a Pantom</h1>
        <p>Hola ${lead.nombre},</p>
        <p>Gracias por registrarte en nuestra plataforma.</p>
      `,
      text: "Bienvenido a Pantom",
      tags: ["welcome", "onboarding"]
    };

    // Enviar el email usando MailerSend
    const response = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error al enviar email a ${lead.email}: ${error.message}`);
    }

    // Registrar la notificación
    await notificationsCollection.insertOne({
      type: 'email_sent',
      leadId: lead._id,
      email: lead.email,
      status: 'success',
      details: {
        campaignId: campaignId,
        campaignName: campaign ? campaign.nombre : 'Bienvenida',
        timestamp: new Date()
      },
      createdAt: new Date(),
      read: false
    });

    // Actualizar estadísticas de la campaña si existe
    if (campaign) {
      await db.collection('campaigns').updateOne(
        { _id: campaignId },
        { 
          $inc: { 
            'estadisticas.total': 1,
            'estadisticas.enviados': 1
          }
        }
      );
    }

    // Actualizar el lead
    await leadsCollection.updateOne(
      { _id: lead._id },
      { 
        $set: { 
          emailStatus: 'sent',
          lastEmailSent: new Date()
        }
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Email enviado correctamente'
    });

  } catch (error) {
    console.error('Error específico para', req.body.email, ':', error);
    
    // Registrar la notificación de error
    if (req.body.leadId) {
      await notificationsCollection.insertOne({
        type: 'email_error',
        leadId: req.body.leadId,
        email: req.body.email,
        status: 'error',
        details: {
          error: error.message,
          timestamp: new Date()
        },
        createdAt: new Date(),
        read: false
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el email',
      error: error.message
    });
  }
} 