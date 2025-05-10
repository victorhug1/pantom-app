import { MailerSend, EmailParams, Sender } from "mailersend";

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender("hola@pantom.net", "Pantom Digital Studio");

export async function sendWelcomeEmail({ to, name }) {
  const recipients = [
    {
      email: to,
      name: name || "",
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("¡Bienvenido a Pantom Digital Studio!")
    .setHtml(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ea5a19; margin-bottom: 20px;">¡Hola ${name || ""}!</h1>
        <p style="color: #333; line-height: 1.6;">Gracias por suscribirte a nuestro newsletter. Pronto recibirás novedades y recursos exclusivos sobre:</p>
        <ul style="color: #333; line-height: 1.6;">
          <li>Desarrollo web y aplicaciones</li>
          <li>SEO y marketing digital</li>
          <li>Bases de datos y optimización</li>
          <li>Estrategias digitales</li>
        </ul>
        <p style="color: #333; line-height: 1.6;">Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">Saludos,<br>El equipo de Pantom Digital Studio</p>
        </div>
      </div>
    `)
    .setText(`¡Hola ${name || ""}!\n\nGracias por suscribirte a nuestro newsletter. Pronto recibirás novedades y recursos exclusivos sobre desarrollo web, SEO, bases de datos y estrategias digitales.\n\nSi tienes alguna pregunta, no dudes en contactarnos.\n\nSaludos,\nEl equipo de Pantom Digital Studio`);

  return mailersend.email.send(emailParams);
}

export async function sendContactResponse({ to, name, mensaje }) {
  const recipients = [
    {
      email: to,
      name: name || "",
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Gracias por contactar a Pantom Digital Studio")
    .setHtml(`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #ea5a19; margin-bottom: 20px;">¡Hola ${name || ""}!</h1>
        <p style="color: #333; line-height: 1.6;">Hemos recibido tu mensaje:</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="color: #333; line-height: 1.6; font-style: italic;">"${mensaje}"</p>
        </div>
        <p style="color: #333; line-height: 1.6;">Nuestro equipo lo revisará y te responderá a la brevedad.</p>
        <p style="color: #333; line-height: 1.6;">Mientras tanto, puedes explorar nuestros servicios en <a href="https://pantom.net" style="color: #ea5a19;">pantom.net</a></p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">Saludos,<br>El equipo de Pantom Digital Studio</p>
        </div>
      </div>
    `)
    .setText(`¡Hola ${name || ""}!\n\nHemos recibido tu mensaje:\n\n"${mensaje}"\n\nNuestro equipo lo revisará y te responderá a la brevedad.\n\nMientras tanto, puedes explorar nuestros servicios en pantom.net\n\nSaludos,\nEl equipo de Pantom Digital Studio`);

  return mailersend.email.send(emailParams);
} 