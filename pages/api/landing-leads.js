import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('landing_leads');

    const { nombre, email, sitioWeb, auditoria } = req.body;

    // Validación básica
    if (!nombre || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nombre y email son requeridos' 
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    // Verificar si el email ya existe
    const existingLead = await collection.findOne({ email });
    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: 'Este email ya está registrado'
      });
    }

    // Crear el lead
    const lead = {
      nombre,
      email,
      sitioWeb: sitioWeb || '',
      auditoria: auditoria || false,
      segmento: 'guia_errores_b2b',
      fuente: 'landing',
      estado: 'nuevo',
      fechaRegistro: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insertar en la base de datos
    await collection.insertOne(lead);

    return res.status(201).json({
      success: true,
      message: 'Lead registrado exitosamente'
    });

  } catch (error) {
    console.error('Error al procesar lead:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor',
      error: error.message 
    });
  }
} 