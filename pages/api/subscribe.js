export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email válido es requerido' });
    }

    // Tu lógica de suscripción aquí
    
    return res.status(200).json({ 
      success: true, 
      message: 'Suscrito exitosamente' 
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Error en el servidor' 
    });
  }
}
