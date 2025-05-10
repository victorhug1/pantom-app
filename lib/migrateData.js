import clientPromise from './mongodb';
import { logger } from './logger';
import { createOrUpdateLead } from './leadService';

export async function migrateData() {
  try {
    logger.info('Iniciando migración de datos...');
    const client = await clientPromise;
    const db = client.db('pantom-app');

    // Migrar suscriptores del newsletter
    const newsletterCollection = db.collection('newsletter');
    const newsletterSubscribers = await newsletterCollection.find({}).toArray();
    
    logger.info(`Encontrados ${newsletterSubscribers.length} suscriptores del newsletter`);
    
    for (const subscriber of newsletterSubscribers) {
      try {
        await createOrUpdateLead({
          nombre: subscriber.name || 'Suscriptor',
          email: subscriber.email,
          fuente: 'newsletter',
          etiquetas: ['newsletter', 'lead_frio'],
          metadata: {
            ...subscriber,
            migrado: true,
            fechaMigracion: new Date()
          }
        });
        logger.info(`Migrado suscriptor: ${subscriber.email}`);
      } catch (error) {
        logger.error(`Error migrando suscriptor ${subscriber.email}:`, error);
      }
    }

    // Migrar contactos
    const contactCollection = db.collection('contacto');
    const contacts = await contactCollection.find({}).toArray();
    
    logger.info(`Encontrados ${contacts.length} contactos`);
    
    for (const contact of contacts) {
      try {
        await createOrUpdateLead({
          nombre: contact.nombre,
          email: contact.email,
          telefono: contact.telefono,
          fuente: 'contacto',
          etiquetas: ['contacto', 'lead_tibio'],
          metadata: {
            ...contact,
            migrado: true,
            fechaMigracion: new Date()
          }
        });
        logger.info(`Migrado contacto: ${contact.email}`);
      } catch (error) {
        logger.error(`Error migrando contacto ${contact.email}:`, error);
      }
    }

    logger.info('Migración completada');
    return {
      newsletterMigrated: newsletterSubscribers.length,
      contactsMigrated: contacts.length
    };
  } catch (error) {
    logger.error('Error en la migración:', error);
    throw error;
  }
} 