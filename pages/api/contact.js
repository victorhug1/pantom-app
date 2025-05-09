import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      allowedMethods: ['POST'] 
    });
  }

  try {
    await connectDB();
    
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const contact = new Contact({
      name,
      email,
      message,
      date: new Date()
    });

    await contact.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al procesar la solicitud' 
    });
  }
}
