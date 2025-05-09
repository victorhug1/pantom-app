import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  console.log('Newsletter API called:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const { name, email } = req.body;
    console.log('Datos recibidos:', { name, email });

    // Validación básica
    if (!email || !name) {
      console.log('Validación fallida: campos requeridos faltantes');
      return res.status(400).json({ 
        success: false,
        message: 'Nombre y email son requeridos' 
      });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validación fallida: formato de email inválido');
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    console.log('Conectando a MongoDB...');
    const client = await clientPromise;
    console.log('Conexión a MongoDB exitosa');
    
    const db = client.db('pantom-app');
    const collection = db.collection('newsletter');

    // Verificar si el email ya existe
    console.log('Verificando email existente...');
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      console.log('Email ya existe en la base de datos');
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
      status: 'active',
      source: 'web',
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      userAgent: req.headers['user-agent'] || ''
    };

    // Insertar en la base de datos
    console.log('Insertando nuevo suscriptor...');
    await collection.insertOne(doc);
    console.log('Suscriptor insertado exitosamente');

    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción exitosa'
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la suscripción',
      error: error.message
    });
  }
} 