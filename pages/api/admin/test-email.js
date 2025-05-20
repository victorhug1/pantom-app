import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { verifyConnection, sendEmail } from '../../../lib/mailersend';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Verificar conexión
    const isConnected = await verifyConnection();
    if (!isConnected) {
      return res.status(500).json({ error: 'Error al conectar con MailerSend' });
    }

    // Enviar email de prueba
    const result = await sendEmail({
      to: 'victorhug1@gmail.com',
      subject: 'Prueba de MailerSend',
      html: `
        <h1>Prueba de MailerSend</h1>
        <p>Este es un email de prueba para verificar la integración con MailerSend.</p>
        <p>Fecha y hora: ${new Date().toLocaleString()}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Email de prueba enviado correctamente',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Error en prueba de email:', error);
    res.status(500).json({
      error: 'Error al enviar email de prueba',
      details: error.message,
    });
  }
} 