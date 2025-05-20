import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { method } = req;
  const client = await clientPromise;
  const db = client.db('pantom-app');

  switch (method) {
    case 'GET':
      try {
        const notifications = await db
          .collection('notifications')
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        res.status(200).json(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Error al obtener las notificaciones' });
      }
      break;

    case 'POST':
      try {
        const { title, message, type, target } = req.body;

        const notification = {
          title,
          message,
          type,
          target,
          status: 'Pendiente',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await db.collection('notifications').insertOne(notification);
        notification._id = result.insertedId;

        res.status(201).json(notification);
      } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Error al crear la notificación' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function getNotification(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  const { method } = req;
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('pantom-app');

  switch (method) {
    case 'GET':
      try {
        const notification = await db
          .collection('notifications')
          .findOne({ _id: new ObjectId(id) });

        if (!notification) {
          return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        res.status(200).json(notification);
      } catch (error) {
        console.error('Error fetching notification:', error);
        res.status(500).json({ error: 'Error al obtener la notificación' });
      }
      break;

    case 'PUT':
      try {
        const { title, message, type, target } = req.body;

        const result = await db.collection('notifications').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              title,
              message,
              type,
              target,
              updatedAt: new Date(),
            },
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Error al actualizar la notificación' });
      }
      break;

    case 'DELETE':
      try {
        const result = await db
          .collection('notifications')
          .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Notificación no encontrada' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Error al eliminar la notificación' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function sendNotification(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('pantom-app');

  try {
    const notification = await db
      .collection('notifications')
      .findOne({ _id: new ObjectId(id) });

    if (!notification) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    // Aquí iría la lógica para enviar la notificación
    // Por ahora solo actualizamos el estado
    await db.collection('notifications').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: 'Enviada',
          updatedAt: new Date(),
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Error al enviar la notificación' });
  }
} 