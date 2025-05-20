import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { sendCampaignEmail } from '../../../../lib/mailersend';

export default async function handler(req, res) {
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
    // Obtener la campaña
    const campaign = await db
      .collection('campaigns')
      .findOne({ _id: new ObjectId(id) });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }

    // Obtener leads activos
    const leads = await db
      .collection('leads')
      .find({
        state: { $nin: ['Rechazado', 'Completado'] },
        emailState: { $nin: ['Enviado', 'Abierto', 'Click'] }
      })
      .toArray();

    // Actualizar estado de la campaña
    await db.collection('campaigns').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: 'Enviando',
          updatedAt: new Date(),
        },
      }
    );

    // Enviar emails a los leads
    const results = await Promise.allSettled(
      leads.map(async (lead) => {
        try {
          await sendCampaignEmail({
            to: lead.email,
            subject: campaign.name,
            html: campaign.template,
            campaignId: id,
          });

          // Actualizar estado del lead
          await db.collection('leads').updateOne(
            { _id: lead._id },
            {
              $set: {
                emailState: 'Enviado',
                updatedAt: new Date(),
              },
            }
          );

          return { success: true, leadId: lead._id };
        } catch (error) {
          console.error(`Error al enviar email a ${lead.email}:`, error);
          return { success: false, leadId: lead._id, error: error.message };
        }
      })
    );

    // Actualizar estado final de la campaña
    const successfulSends = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
    await db.collection('campaigns').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: 'Completada',
          sentCount: successfulSends,
          updatedAt: new Date(),
        },
      }
    );

    res.status(200).json({
      success: true,
      totalLeads: leads.length,
      successfulSends,
      failedSends: leads.length - successfulSends,
    });
  } catch (error) {
    console.error('Error sending campaign:', error);
    
    // Actualizar estado de la campaña en caso de error
    await db.collection('campaigns').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: 'Error',
          updatedAt: new Date(),
        },
      }
    );

    res.status(500).json({ error: 'Error al enviar la campaña' });
  }
} 