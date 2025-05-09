import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    console.log('Intentando conectar a MongoDB...');
    const client = await clientPromise;
    console.log('Conexión exitosa a MongoDB');
    
    // Intentar una operación simple
    const db = client.db('pantom-app');
    const collections = await db.listCollections().toArray();
    console.log('Colecciones disponibles:', collections.map(c => c.name));

    return res.status(200).json({ 
      success: true, 
      message: 'Conexión a MongoDB exitosa',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error de conexión a MongoDB',
      error: error.message
    });
  }
} 