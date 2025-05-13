import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('pantom-app');
  const collection = db.collection('settings');

  if (req.method === 'GET') {
    try {
      const settings = await collection.findOne({ _id: 'global' });

      if (!settings) {
        // Si no existe configuración, devolver valores por defecto
        return res.status(200).json({
          success: true,
          settings: {
            emailSettings: {
              smtpHost: '',
              smtpPort: '',
              smtpUser: '',
              smtpPass: '',
              fromEmail: '',
              fromName: '',
            },
            notificationSettings: {
              emailNotifications: true,
              browserNotifications: true,
            },
            securitySettings: {
              twoFactorAuth: false,
              sessionTimeout: 30,
            },
          }
        });
      }

      return res.status(200).json({
        success: true,
        settings: settings
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const settings = req.body;

      // Validar la estructura de la configuración
      if (!settings.emailSettings || !settings.notificationSettings || !settings.securitySettings) {
        return res.status(400).json({
          success: false,
          message: 'Estructura de configuración inválida'
        });
      }

      // Actualizar o insertar la configuración
      const result = await collection.updateOne(
        { _id: 'global' },
        { $set: { ...settings, updatedAt: new Date() } },
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Configuración guardada exitosamente'
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  // Método no permitido
  return res.status(405).json({ success: false, message: 'Método no permitido' });
} 