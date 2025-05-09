import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      });
    }

    await connectDB();
    
    const contact = new Contact({ name, email, message });
    await contact.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado exitosamente' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Error al procesar el mensaje' 
    });
  }
}
