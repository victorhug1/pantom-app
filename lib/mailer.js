import { MailerSend, EmailParams, Sender } from "mailersend";

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export async function sendWelcomeEmail({ to, name }) {
  const sentFrom = new Sender("hola@pantom.net", "Pantom Digital Studio");

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
    .setHtml(`<h1>¡Hola ${name || ""}!</h1><p>Gracias por suscribirte a nuestro newsletter. Pronto recibirás novedades y recursos exclusivos.</p>`)
    .setText(`¡Hola ${name || ""}!\nGracias por suscribirte a nuestro newsletter. Pronto recibirás novedades y recursos exclusivos.`);

  return mailersend.email.send(emailParams);
} 