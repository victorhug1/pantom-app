import { initializeDatabase, checkIndexes } from './initDb';
import { logger } from './logger';

export async function initializeApp() {
  try {
    logger.info('Iniciando aplicación...');
    
    // Verificar conexión a MongoDB
    const client = await clientPromise;
    const db = client.db('pantom-app');
    await db.command({ ping: 1 });
    logger.info('Conexión a MongoDB establecida');

    // Verificar índices
    const indexesExist = await checkIndexes();
    if (!indexesExist) {
      logger.info('Creando índices...');
      await initializeDatabase();
      logger.info('Índices creados exitosamente');
    } else {
      logger.info('Índices verificados correctamente');
    }

    // Verificar colecciones necesarias
    const collections = await db.listCollections().toArray();
    const requiredCollections = ['leads', 'logs'];
    const missingCollections = requiredCollections.filter(
      collection => !collections.some(c => c.name === collection)
    );

    if (missingCollections.length > 0) {
      logger.info('Creando colecciones faltantes:', missingCollections);
      for (const collection of missingCollections) {
        await db.createCollection(collection);
      }
      logger.info('Colecciones creadas exitosamente');
    }

    logger.info('Inicialización completada');
    return true;
  } catch (error) {
    logger.error('Error en la inicialización:', error);
    throw error;
  }
} 