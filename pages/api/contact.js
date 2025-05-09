import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';

export default async function handler(req, res) {
  console.log('Contact API called');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { name, email, message } = req.body;
    console.log('Contact form data:', { name, email, message });

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      });
    }

    console.log('Connecting to DB...');
    await connectDB();
    console.log('DB connected');

    const contact = new Contact({
      name,
      email,
      message,
      createdAt: new Date()
    });

    await contact.save();
    console.log('Contact saved');

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado exitosamente'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
