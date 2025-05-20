import nodemailer from 'nodemailer';

// Configuración del transporter de MailerSend
const transporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: 'MS_EiuBe8@pantom.net',
    pass: 'mssp.IqQHDEC.3yxj6ljq9wxgdo2r.TvOaLjQ',
  },
});

// Función para enviar email
export async function sendEmail({ to, subject, html, from = 'Pantom <noreply@pantom.net>' }) {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log('Email enviado:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
}

// Función para enviar email de campaña
export async function sendCampaignEmail({ to, subject, html, campaignId }) {
  try {
    const info = await transporter.sendMail({
      from: 'Pantom <noreply@pantom.net>',
      to,
      subject,
      html,
      headers: {
        'X-Campaign-ID': campaignId,
      },
    });

    console.log('Email de campaña enviado:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error al enviar email de campaña:', error);
    throw error;
  }
}

// Función para verificar la conexión
export async function verifyConnection() {
  try {
    await transporter.verify();
    console.log('Conexión con MailerSend verificada correctamente');
    return true;
  } catch (error) {
    console.error('Error al verificar conexión con MailerSend:', error);
    return false;
  }
} 