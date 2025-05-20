import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

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
        const settings = await db.collection('settings').findOne({ _id: 'global' });

        if (!settings) {
          // Si no existe configuración, crear una por defecto
          const defaultSettings = {
            _id: 'global',
            general: {
              siteName: 'Pantom App',
              siteDescription: 'Plataforma de gestión de leads',
              maintenanceMode: false,
            },
            email: {
              smtpHost: '',
              smtpPort: '',
              smtpUser: '',
              smtpPassword: '',
              fromEmail: '',
              fromName: '',
              replyTo: '',
            },
            notifications: {
              enableEmailNotifications: true,
              enablePushNotifications: true,
              notificationTypes: {
                newLead: true,
                leadResponse: true,
                campaignComplete: true,
                systemAlert: true,
              },
            },
          };

          await db.collection('settings').insertOne(defaultSettings);
          return res.status(200).json(defaultSettings);
        }

        res.status(200).json(settings);
      } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ error: 'Error al obtener la configuración' });
      }
      break;

    case 'PUT':
      try {
        const settings = req.body;

        const result = await db.collection('settings').updateOne(
          { _id: 'global' },
          {
            $set: {
              ...settings,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
          return res.status(500).json({ error: 'Error al actualizar la configuración' });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ error: 'Error al actualizar la configuración' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 