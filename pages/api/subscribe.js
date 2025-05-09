import connectDB from '../../lib/mongodb';
import Newsletter from '../../models/Newsletter';

export default async function handler(req, res) {
  console.log('Newsletter API called');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { email } = req.body;
    console.log('Email received:', email);

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    console.log('Connecting to DB...');
    await connectDB();
    console.log('DB connected');

    // Verificar si ya existe
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    const newsletter = new Newsletter({ 
      email,
      createdAt: new Date()
    });

    await newsletter.save();
    console.log('Newsletter saved');

    return res.status(200).json({
      success: true,
      message: 'Suscripción exitosa'
    });

  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
}
