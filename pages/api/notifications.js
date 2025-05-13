import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('pantom-app');
  const collection = db.collection('notifications');

  if (req.method === 'POST') {
    try {
      const { type, leadId, email, status, details } = req.body;

      const notification = {
        type, // 'email_sent', 'email_opened', 'email_clicked', 'email_bounced'
        leadId,
        email,
        status,
        details,
        createdAt: new Date(),
        read: false
      };

      await collection.insertOne(notification);

      return res.status(201).json({
        success: true,
        message: 'Notificación registrada'
      });
    } catch (error) {
      console.error('Error registrando notificación:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 10, type, read } = req.query;
      const query = {};

      if (type) query.type = type;
      if (read !== undefined) query.read = read === 'true';

      // Calcular el total de notificaciones
      const total = await collection.countDocuments(query);

      // Obtener las notificaciones con paginación
      const notifications = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .toArray();

      return res.status(200).json({
        success: true,
        notifications,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id } = req.query;
      const { read } = req.body;

      if (!id) {
        return res.status(400).json({ success: false, message: 'ID de notificación requerido' });
      }

      const result = await collection.updateOne(
        { _id: id },
        { $set: { read, updatedAt: new Date() } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ success: false, message: 'Notificación no encontrada' });
      }

      return res.status(200).json({
        success: true,
        message: 'Notificación actualizada exitosamente'
      });
    } catch (error) {
      console.error('Error updating notification:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  // Método no permitido
  return res.status(405).json({ success: false, message: 'Método no permitido' });
} 