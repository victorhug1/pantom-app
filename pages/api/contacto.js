import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { nombre, email, mensaje, telefono = '', origen = '', etiquetas = [] } = req.body;
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ message: 'Nombre, email y mensaje son obligatorios' });
    }
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('contacto');
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
    await collection.insertOne(doc);
    res.status(200).json({ success: true, message: 'Mensaje guardado', data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
} 