import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const { nombre, email, mensaje, telefono = '', origen = '', etiquetas = [] } = req.body;

    // Validación de campos requeridos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ 
        success: false,
        message: 'Nombre, email y mensaje son obligatorios' 
      });
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    // Validación de longitud del mensaje
    if (mensaje.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'El mensaje debe tener al menos 10 caracteres'
      });
    }

    // Conexión a MongoDB
    let client;
    try {
      client = await clientPromise;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error de conexión con la base de datos'
      });
    }

    const db = client.db('pantom-app');
    const collection = db.collection('contacto');

    // Crear documento
    const doc = {
      nombre,
      email,
      mensaje,
      telefono,
      fecha: new Date(),
      leido: false,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      origen,
      userAgent: req.headers['user-agent'] || '',
      etiquetas,
      resuelto: false
    };

    // Insertar en la base de datos
    try {
      await collection.insertOne(doc);
    } catch (error) {
      console.error('MongoDB insert error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al guardar el mensaje'
      });
    }

    // Respuesta exitosa
    return res.status(200).json({ 
      success: true, 
      message: 'Mensaje guardado correctamente',
      data: doc 
    });

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
} 