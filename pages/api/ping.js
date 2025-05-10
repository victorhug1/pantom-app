import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const startTime = Date.now();
    const client = await clientPromise;
    const db = client.db('pantom-app');
    
    // Intentar una operación simple
    await db.command({ ping: 1 });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    return res.status(200).json({
      success: true,
      message: 'Conexión a MongoDB establecida',
      data: {
        status: 'ok',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        database: 'pantom-app'
      }
    });
  } catch (error) {
    console.error('Error en ping API:', error);
    return res.status(500).json({
      success: false,
      message: 'Error de conexión a MongoDB',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 