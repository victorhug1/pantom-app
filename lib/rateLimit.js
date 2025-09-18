// Rate limiting para APIs de administración
const rateLimitMap = new Map();

export function rateLimit(options = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutos
    max = 100, // máximo 100 requests por ventana
    message = 'Demasiadas solicitudes, intenta más tarde',
    keyGenerator = (req) => req.ip || 'unknown'
  } = options;

  return (req, res, next) => {
    const key = keyGenerator(req);
    const now = Date.now();
    const windowStart = now - windowMs;

    // Limpiar entradas expiradas
    if (rateLimitMap.has(key)) {
      const requests = rateLimitMap.get(key).filter(time => time > windowStart);
      rateLimitMap.set(key, requests);
    } else {
      rateLimitMap.set(key, []);
    }

    const requests = rateLimitMap.get(key);

    if (requests.length >= max) {
      return res.status(429).json({
        error: message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }

    requests.push(now);
    rateLimitMap.set(key, requests);

    if (next) next();
  };
}

// Rate limiting específico para login
export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos de login
  message: 'Demasiados intentos de login, espera 15 minutos'
});

// Rate limiting para APIs de admin
export const adminRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // máximo 1000 requests por ventana
  message: 'Demasiadas solicitudes a la API de administración'
});
