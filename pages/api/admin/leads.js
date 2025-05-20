import clientPromise from '../../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  // Verificar autenticación
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('leads');

    switch (req.method) {
      case 'GET':
        // Obtener leads con paginación y filtros
        const { page = 1, limit = 10, estado, search } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        let query = {};
        if (estado) {
          query.estado_funnel = estado;
        }
        if (search) {
          query.$or = [
            { email: { $regex: search, $options: 'i' } },
            { empresa: { $regex: search, $options: 'i' } },
            { representanteLegal: { $regex: search, $options: 'i' } }
          ];
        }

        const [leads, total] = await Promise.all([
          collection.find(query)
            .sort({ fecha_creacion: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray(),
          collection.countDocuments(query)
        ]);

        // Obtener estadísticas
        const stats = await collection.aggregate([
          {
            $group: {
              _id: '$estado_funnel',
              count: { $sum: 1 }
            }
          }
        ]).toArray();

        return res.status(200).json({
          success: true,
          data: {
            leads,
            pagination: {
              total,
              page: parseInt(page),
              limit: parseInt(limit),
              pages: Math.ceil(total / parseInt(limit))
            },
            stats: stats.reduce((acc, curr) => {
              acc[curr._id || 'sin_estado'] = curr.count;
              return acc;
            }, {})
          }
        });

      case 'PUT':
        // Actualizar estado de un lead
        const { id, estado_funnel } = req.body;
        if (!id || !estado_funnel) {
          return res.status(400).json({
            success: false,
            message: 'ID y estado son requeridos'
          });
        }

        const result = await collection.updateOne(
          { _id: id },
          {
            $set: {
              estado_funnel,
              fecha_ultimo_envio: new Date(),
              proximo_envio: estado_funnel === 'completado' ? null : new Date()
            }
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({
            success: false,
            message: 'Lead no encontrado'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Lead actualizado correctamente'
        });

      case 'DELETE':
        // Eliminar un lead
        const { id: leadId } = req.query;
        if (!leadId) {
          return res.status(400).json({
            success: false,
            message: 'ID es requerido'
          });
        }

        const deleteResult = await collection.deleteOne({ _id: leadId });
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            message: 'Lead no encontrado'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Lead eliminado correctamente'
        });

      default:
        return res.status(405).json({
          success: false,
          message: 'Método no permitido'
        });
    }
  } catch (error) {
    console.error('Error en el endpoint admin/leads:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
} 