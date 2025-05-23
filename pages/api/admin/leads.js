import clientPromise from '../../../lib/mongodb';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Verificar autenticación
  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res.status(401).json({ error: 'No autorizado' });
  // }

  const { method } = req;
  const client = await clientPromise;
  const db = client.db('pantom-app');

  switch (method) {
    case 'GET':
      try {
        // Ignorar todos los filtros y devolver todos los leads
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const leads = await db
          .collection('leads')
          .find({})
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit))
          .toArray();

        const total = await db.collection('leads').countDocuments({});

        res.status(200).json({
          success: true,
          data: {
            leads,
            pagination: {
              total,
              page: parseInt(page),
              totalPages: Math.ceil(total / parseInt(limit)),
            }
          }
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

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 