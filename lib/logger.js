import clientPromise from './mongodb';

// Niveles de log
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Función para formatear el mensaje de log
function formatLogMessage(level, message, data = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  };
}

// Función para guardar log en MongoDB
async function saveLogToMongo(logData) {
  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('logs');
    
    await collection.insertOne({
      ...logData,
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error al guardar log en MongoDB:', error);
  }
}

// Logger principal
export const logger = {
  // Log de error (siempre se guarda en MongoDB)
  async error(message, data = {}) {
    const logData = formatLogMessage(LOG_LEVELS.ERROR, message, data);
    console.error(logData);
    await saveLogToMongo(logData);
  },

  // Log de advertencia (se guarda en MongoDB si es importante)
  async warn(message, data = {}, saveToMongo = false) {
    const logData = formatLogMessage(LOG_LEVELS.WARN, message, data);
    console.warn(logData);
    if (saveToMongo) {
      await saveLogToMongo(logData);
    }
  },

  // Log informativo (solo consola)
  info(message, data = {}) {
    const logData = formatLogMessage(LOG_LEVELS.INFO, message, data);
    console.info(logData);
  },

  // Log de depuración (solo en desarrollo)
  debug(message, data = {}) {
    if (process.env.NODE_ENV === 'development') {
      const logData = formatLogMessage(LOG_LEVELS.DEBUG, message, data);
      console.debug(logData);
    }
  }
};

// Middleware para logging de API
export function apiLogger(req, res, next) {
  const start = Date.now();
  
  // Log de inicio de petición
  logger.debug('Inicio de petición API', {
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body
  });

  // Interceptar la respuesta
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    
    // Log de fin de petición
    logger.info('Fin de petición API', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });

    // Si hay error, guardar en MongoDB
    if (res.statusCode >= 400) {
      logger.error('Error en petición API', {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        body: body,
        duration: `${duration}ms`
      });
    }

    return originalSend.call(this, body);
  };

  next();
} 