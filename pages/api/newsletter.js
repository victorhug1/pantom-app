import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const { name, email } = req.body;

    // Validación básica
    if (!email || !name) {
      return res.status(400).json({ 
        success: false,
        message: 'Nombre y email son requeridos' 
      });
    }

    // Conexión a MongoDB
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('newsletter');

    // Verificar si el email ya existe
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
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
      status: 'active'
    };

    // Insertar en la base de datos
    await collection.insertOne(doc);

    return res.status(200).json({ 
      success: true, 
      message: 'Suscripción exitosa'
    });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error al procesar la suscripción'
    });
  }
} 