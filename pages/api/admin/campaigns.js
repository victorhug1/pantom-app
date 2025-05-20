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
        const campaigns = await db
          .collection('campaigns')
          .find({})
          .sort({ createdAt: -1 })
          .toArray();

        res.status(200).json(campaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'Error al obtener las campañas' });
      }
      break;

    case 'POST':
      try {
        const { name, description, template } = req.body;

        const campaign = {
          name,
          description,
          template,
          status: 'Borrador',
          sentCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await db.collection('campaigns').insertOne(campaign);
        campaign._id = result.insertedId;

        res.status(201).json(campaign);
      } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ error: 'Error al crear la campaña' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function getCampaign(req, res) {
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
        const campaign = await db
          .collection('campaigns')
          .findOne({ _id: new ObjectId(id) });

        if (!campaign) {
          return res.status(404).json({ error: 'Campaña no encontrada' });
        }

        res.status(200).json(campaign);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ error: 'Error al obtener la campaña' });
      }
      break;

    case 'PUT':
      try {
        const { name, description, template } = req.body;

        const result = await db.collection('campaigns').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              name,
              description,
              template,
              updatedAt: new Date(),
            },
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Campaña no encontrada' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error updating campaign:', error);
        res.status(500).json({ error: 'Error al actualizar la campaña' });
      }
      break;

    case 'DELETE':
      try {
        const result = await db
          .collection('campaigns')
          .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Campaña no encontrada' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ error: 'Error al eliminar la campaña' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export async function sendCampaign(req, res) {
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
    const campaign = await db
      .collection('campaigns')
      .findOne({ _id: new ObjectId(id) });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }

    // Aquí iría la lógica para enviar la campaña
    // Por ahora solo actualizamos el estado
    await db.collection('campaigns').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: 'Enviando',
          updatedAt: new Date(),
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending campaign:', error);
    res.status(500).json({ error: 'Error al enviar la campaña' });
  }
} 