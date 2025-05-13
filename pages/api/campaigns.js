import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('pantom-app');
  const collection = db.collection('campaigns');

  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10, estado } = req.query;
      const query = {};

      if (estado) query.estado = estado;

      // Calcular el total de campañas
      const total = await collection.countDocuments(query);

      // Obtener las campañas con paginación
      const campaigns = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .toArray();

      return res.status(200).json({
        success: true,
        campaigns,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { nombre, segmento, fechaProgramada, contenido } = req.body;

      // Validar campos requeridos
      if (!nombre || !segmento || !fechaProgramada || !contenido) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos requeridos'
        });
      }

      const campaign = {
        nombre,
        segmento,
        fechaProgramada: new Date(fechaProgramada),
        contenido,
        estado: 'programada',
        stats: {
          enviados: 0,
          abiertos: 0,
          clicks: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(campaign);

      return res.status(201).json({
        success: true,
        message: 'Campaña creada exitosamente',
        campaign: { ...campaign, _id: result.insertedId }
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const updates = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'ID de campaña requerido' });
      }

      const result = await collection.updateOne(
        { _id: id },
        { $set: { ...updates, updatedAt: new Date() } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, message: 'Campaña no encontrada' });
      }

      return res.status(200).json({
        success: true,
        message: 'Campaña actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error updating campaign:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'ID de campaña requerido' });
      }

      const result = await collection.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'Campaña no encontrada' });
      }

      return res.status(200).json({
        success: true,
        message: 'Campaña eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  // Método no permitido
  return res.status(405).json({ success: false, message: 'Método no permitido' });
} 