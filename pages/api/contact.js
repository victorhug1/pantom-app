import axios from 'axios';

const MAILERSEND_API_KEY = 'mlsn.f4b3dab0872b733e9d404cdd0e12093cee5cc380a7601ee4896b769826210edc';
const MAILERSEND_API_URL = 'https://api.mailersend.com/v1/email';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const response = await axios.post(
      MAILERSEND_API_URL,
      {
        from: {
          email: 'hola@pantom.net',
          name: 'Pantom Contacto'
        },
        to: [
          {
            email: 'hola@pantom.net',
            name: 'Pantom Contacto'
          }
        ],
        reply_to: {
          email: email,
          name: name
        },
        subject: `Nuevo mensaje de contacto de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong><br/>${message}</p>`
      },
      {
        headers: {
          'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
  } catch (error) {
    console.error('Error enviando email de contacto:', error.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Error enviando el mensaje.' });
  }
} 