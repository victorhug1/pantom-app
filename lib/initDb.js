import clientPromise from './mongodb';

export async function initializeDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('leads');

    // Crear índices
    await collection.createIndexes([
      // Índice único para email
      {
        key: { email: 1 },
        unique: true,
        name: 'email_unique'
      },
      // Índice para segmento
      {
        key: { segmento: 1 },
        name: 'segmento_index'
      },
      // Índice para fechaRegistro
      {
        key: { fechaRegistro: 1 },
        name: 'fecha_registro_index'
      },
      // Índice compuesto para búsquedas comunes
      {
        key: { segmento: 1, estado: 1, fechaRegistro: -1 },
        name: 'segmento_estado_fecha_index'
      }
    ]);

    console.log('Índices creados exitosamente');
    return true;
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

// Función para verificar si los índices existen
export async function checkIndexes() {
  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('leads');
    
    const indexes = await collection.indexes();
    const requiredIndexes = [
      'email_unique',
      'segmento_index',
      'fecha_registro_index',
      'segmento_estado_fecha_index'
    ];

    const missingIndexes = requiredIndexes.filter(
      requiredIndex => !indexes.some(index => index.name === requiredIndex)
    );

    if (missingIndexes.length > 0) {
      console.log('Índices faltantes:', missingIndexes);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error al verificar índices:', error);
    throw error;
  }
} 