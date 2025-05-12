import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('pantom-app');
  const collection = db.collection('leads');

  if (req.method === 'POST') {
    // Crear un nuevo lead
    try {
      const { nombre, email, segmento, fechaRegistro = new Date().toISOString() } = req.body;

      // Validación básica
      if (!nombre || !email || !segmento) {
        return res.status(400).json({ success: false, message: 'Faltan campos requeridos' });
      }

      // Validación de email simple
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ success: false, message: 'Email inválido' });
      }

      // Verificar si ya existe el lead
      const existing = await collection.findOne({ email });
      if (existing) {
        return res.status(409).json({ success: false, message: 'El email ya está registrado' });
      }

      const lead = {
        nombre,
        email,
        segmento,
        fechaRegistro: new Date(fechaRegistro),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await collection.insertOne(lead);

      return res.status(201).json({ success: true, message: 'Lead creado', lead });
    } catch (error) {
      console.error('Error creando lead:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'GET') {
    // Consultar leads con filtros
    try {
      const { email, segmento, limit = 20 } = req.query;
      const query = {};
      if (email) query.email = email;
      if (segmento) query.segmento = segmento;

      const leads = await collection
        .find(query)
        .sort({ fechaRegistro: -1 })
        .limit(Number(limit))
        .toArray();

      return res.status(200).json({ success: true, leads });
    } catch (error) {
      console.error('Error consultando leads:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  // Método no permitido
  return res.status(405).json({ success: false, message: 'Método no permitido' });
} 