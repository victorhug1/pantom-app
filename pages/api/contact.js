import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailersend.net',
      port: 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: 'MS_EiuBe8@pantom.net',
        pass: 'mssp.IqQHDEC.3yxj6ljq9wxgdo2r.TvOaLjQ',
      },
    });

    await transporter.sendMail({
      from: 'Pantom Contacto <hola@pantom.net>',
      to: 'hola@pantom.net',
      subject: `Nuevo mensaje de contacto de ${name}`,
      replyTo: email,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong><br/>${message}</p>`
    });

    return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error enviando email de contacto:', error);
    return res.status(500).json({ success: false, message: 'Error enviando el mensaje.' });
  }
} 