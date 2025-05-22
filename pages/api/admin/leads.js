import clientPromise from '../../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Verificar autenticación
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
        const { page = 1, limit = 10, search = '', state = '', emailState = '' } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Construir el filtro de búsqueda
        let filter = {};
        if (search) {
          filter = {
            $or: [
              { email: { $regex: search, $options: 'i' } },
              { name: { $regex: search, $options: 'i' } },
              { notes: { $regex: search, $options: 'i' } },
              { empresa: { $regex: search, $options: 'i' } },
              { representanteLegal: { $regex: search, $options: 'i' } },
            ],
          };
        }

        // Añadir filtros de estado
        if (state) {
          filter.state = state;
        }
        if (emailState) {
          filter.emailState = emailState;
        }

        const leads = await db
          .collection('leads')
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .toArray();

        const total = await db.collection('leads').countDocuments(filter);

        res.status(200).json({
          leads,
          total,
          page: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
        });
      } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Error al obtener los leads' });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const { state, emailState, notes } = req.body;

        const result = await db.collection('leads').updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              state,
              emailState,
              notes,
              updatedAt: new Date(),
            },
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Lead no encontrado' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).json({ error: 'Error al actualizar el lead' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;

        const result = await db.collection('leads').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Lead no encontrado' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({ error: 'Error al eliminar el lead' });
      }
      break;

    case 'POST':
      try {
        const filter = req.body;
        const leads = await db.collection('leads').find(filter).toArray();
        res.status(200).json({ success: true, data: leads });
      } catch (error) {
        console.error('Error filtering leads:', error);
        res.status(500).json({ error: 'Error al filtrar los leads' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 