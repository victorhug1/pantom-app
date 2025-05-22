import { MailerSend, EmailParams, Sender } from "mailersend";

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

// IDs de las plantillas de MailerSend
const TEMPLATES = {
  email_1: '8jqk5n2m4p6r', // Reemplazar con el ID real
  email_2: '9kpl6m3n5q7s', // Reemplazar con el ID real
  email_3: '0lqm7n4o6r8t'  // Reemplazar con el ID real
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  const { email = 'victorhug1@hotmail.com', nombre = 'Victor' } = req.body;

  try {
    // Enviar email 1
    const email1Params = new EmailParams()
      .setFrom(new Sender("hola@pantom.net", "Pantom Digital Studio"))
      .setTo([{ email: "victorhug1@hotmail.com", name: nombre }]) // Usar la dirección del administrador
      .setSubject("¿Tu presencia digital está haciendo crecer tu negocio?")
      .setTemplateId(TEMPLATES.email_1)
      .setPersonalization([
        {
          email: "victorhug1@hotmail.com",
          data: {
            nombre: nombre
          }
        }
      ]);

    await mailersend.email.send(email1Params);
    console.log('Email 1 enviado');

    // Enviar email 2
    const email2Params = new EmailParams()
      .setFrom(new Sender("hola@pantom.net", "Pantom Digital Studio"))
      .setTo([{ email: "victorhug1@hotmail.com", name: nombre }]) // Usar la dirección del administrador
      .setSubject("¿Tu sitio web está frenando tus ventas?")
      .setTemplateId(TEMPLATES.email_2)
      .setPersonalization([
        {
          email: "victorhug1@hotmail.com",
          data: {
            nombre: nombre
          }
        }
      ]);

    await mailersend.email.send(email2Params);
    console.log('Email 2 enviado');

    // Enviar email 3
    const email3Params = new EmailParams()
      .setFrom(new Sender("hola@pantom.net", "Pantom Digital Studio"))
      .setTo([{ email: "victorhug1@hotmail.com", name: nombre }]) // Usar la dirección del administrador
      .setSubject("¿Hablamos esta semana?")
      .setTemplateId(TEMPLATES.email_3)
      .setPersonalization([
        {
          email: "victorhug1@hotmail.com",
          data: {
            nombre: nombre
          }
        }
      ]);

    await mailersend.email.send(email3Params);
    console.log('Email 3 enviado');

    return res.status(200).json({ 
      success: true, 
      message: 'Emails de prueba enviados correctamente',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error enviando emails de prueba:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error enviando emails de prueba',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 