import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  const { nombre, email, sitioWeb, auditoria, segmento = 'guia_errores_b2b' } = req.body;

  // 1. Email de agradecimiento al usuario (MailerSend API)
  try {
    await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
      },
      body: JSON.stringify({
        from: { email: 'hola@pantom.net', name: 'Pantom Digital Studio' },
        to: [{ email, name: nombre }],
        subject: '¡Gracias por solicitar la guía y tu auditoría gratuita!',
        html: `
          <p>Hola <b>${nombre}</b>,</p>
          <p>¡Gracias por descargar la guía <b>7 errores silenciosos que frenan tu sitio B2B</b>!</p>
          <p>${auditoria ? 'Nuestro equipo te contactará pronto para agendar tu revisión gratuita. Si prefieres, puedes reservar directamente aquí:' : ''}</p>
          <p><a href="https://calendly.com/digitalstudiopantom" style="background:#ff9800;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">Agendar llamada en Calendly</a></p>
          <p>Si tienes dudas, responde a este correo.<br/>Equipo Pantom</p>
        `
      })
    });
  } catch (error) {
    console.error('Error enviando email usuario:', error);
  }

  // 2. Notificación interna por email (puedes usar MailerSend, Nodemailer, etc.)
  try {
    // Ejemplo con Nodemailer (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    await transporter.sendMail({
      from: 'notificaciones@pantom.net',
      to: 'equipo@pantom.net',
      subject: 'Nuevo lead de la guía B2B',
      html: `<b>Nombre:</b> ${nombre}<br/><b>Email:</b> ${email}<br/><b>Sitio web:</b> ${sitioWeb || '-'}<br/><b>Auditoría:</b> ${auditoria ? 'Sí' : 'No'}`
    });
  } catch (error) {
    console.error('Error enviando notificación interna:', error);
  }

  // 3. Notificación a Slack (webhook)
  try {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Nuevo lead de la guía B2B:\nNombre: ${nombre}\nEmail: ${email}\nSitio web: ${sitioWeb || '-'}\nAuditoría: ${auditoria ? 'Sí' : 'No'}`
      })
    });
  } catch (error) {
    console.error('Error enviando a Slack:', error);
  }

  // 4. (Opcional) Notion API
  // Puedes agregar aquí la integración con Notion si tienes el token y databaseId

  return res.status(200).json({ success: true, message: 'Notificaciones enviadas' });
} 