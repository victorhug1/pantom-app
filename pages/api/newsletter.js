import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  console.log('Newsletter API called');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const { name, email, source = 'unknown', tags = [], lang = 'es' } = req.body;
    console.log('Received data:', { name, email, source, tags, lang });

    // Validación de campos requeridos
    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: 'El email es requerido' 
      });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    console.log('Connecting to MongoDB...');
    // Conexión a MongoDB
    const client = await clientPromise;
    console.log('MongoDB connected successfully');
    
    const db = client.db('pantom-app');
    const collection = db.collection('newsletter');

    // Verificar si el email ya existe
    console.log('Checking for existing subscriber...');
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      console.log('Email already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'Este email ya está suscrito'
      });
    }

    // Crear documento
    const doc = {
      email,
      name,
      createdAt: new Date(),
      source,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      status: 'active',
      tags,
      lang
    };

    console.log('Inserting new subscriber...');
    // Insertar en la base de datos
    await collection.insertOne(doc);
    console.log('Subscriber inserted successfully');

    // Respuesta exitosa
    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción exitosa',
      data: doc 
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
} 