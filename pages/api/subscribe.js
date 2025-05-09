import connectDB from '../../lib/mongodb';
import Newsletter from '../../models/Newsletter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email válido es requerido' });
    }

    await connectDB();
    
    const subscription = new Newsletter({ email });
    await subscription.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción exitosa' 
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ 
      error: 'Error al procesar la suscripción' 
    });
  }
}
