import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');

    // Obtener total de leads
    const totalLeads = await db.collection('leads').countDocuments();

    // Obtener leads activos (no rechazados ni completados)
    const activeLeads = await db.collection('leads').countDocuments({
      state: { $nin: ['Rechazado', 'Completado'] }
    });

    // Obtener total de emails enviados
    const emailsSent = await db.collection('leads').countDocuments({
      emailState: { $in: ['Enviado', 'Abierto', 'Click'] }
    });

    // Calcular tasa de respuesta
    const respondedLeads = await db.collection('leads').countDocuments({
      state: { $in: ['Respondió', 'Aceptado', 'Completado'] }
    });
    const responseRate = totalLeads > 0 ? Math.round((respondedLeads / totalLeads) * 100) : 0;

    // Calcular tasa de conversión
    const convertedLeads = await db.collection('leads').countDocuments({
      state: { $in: ['Aceptado', 'Completado'] }
    });
    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

    // Obtener distribución de estados
    const stateDistribution = await db.collection('leads').aggregate([
      {
        $group: {
          _id: '$state',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    // Obtener distribución de estados de email
    const emailStateDistribution = await db.collection('leads').aggregate([
      {
        $group: {
          _id: '$emailState',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    // Obtener actividad reciente
    const recentActivity = await db.collection('leads')
      .find({})
      .sort({ updatedAt: -1 })
      .limit(5)
      .toArray();

    res.status(200).json({
      totalLeads,
      activeLeads,
      emailsSent,
      responseRate,
      conversionRate,
      stateDistribution,
      emailStateDistribution,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
} 