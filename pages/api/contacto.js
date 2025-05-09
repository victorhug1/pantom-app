import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  console.log('Contacto API called:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  try {
    const { nombre, email, mensaje, telefono = '', origen = '', etiquetas = [] } = req.body;
    console.log('Datos recibidos:', { nombre, email, telefono, origen, etiquetas });

    // Validación de campos requeridos
    if (!nombre || !email || !mensaje) {
      console.log('Validación fallida: campos requeridos faltantes');
      return res.status(400).json({ 
        success: false,
        message: 'Nombre, email y mensaje son obligatorios' 
      });
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validación fallida: formato de email inválido');
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    // Validación de longitud del mensaje
    if (mensaje.length < 10) {
      console.log('Validación fallida: mensaje demasiado corto');
      return res.status(400).json({
        success: false,
        message: 'El mensaje debe tener al menos 10 caracteres'
      });
    }

    // Conexión a MongoDB
    console.log('Conectando a MongoDB...');
    const client = await clientPromise;
    console.log('Conexión a MongoDB exitosa');
    
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
    console.log('Insertando mensaje de contacto...');
    await collection.insertOne(doc);
    console.log('Mensaje insertado exitosamente');

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