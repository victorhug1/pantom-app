import connectDB from '../../lib/mongodb';
import Newsletter from '../../models/Newsletter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      allowedMethods: ['POST'] 
    });
  }

  try {
    await connectDB();
    
    const { email } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email válido es requerido' });
    }

    // Verificar si el email ya existe
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ 
        error: 'Este email ya está suscrito' 
      });
    }

    const subscription = new Newsletter({
      email,
      date: new Date()
    });

    await subscription.save();
    console.log('Newsletter subscription saved:', email);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción exitosa' 
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error al procesar la suscripción' 
    });
  }
}
