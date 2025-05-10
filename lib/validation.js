import { sanitizeHtml } from 'isomorphic-dompurify';

// Límites de longitud para campos
const LIMITS = {
  nombre: { min: 2, max: 100 },
  email: { max: 254 },
  telefono: { max: 20 },
  mensaje: { min: 10, max: 2000 }
};

// Función para validar email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para validar longitud
export function isValidLength(value, field) {
  const limit = LIMITS[field];
  if (!limit) return true;
  
  const length = value.trim().length;
  if (limit.min && length < limit.min) return false;
  if (limit.max && length > limit.max) return false;
  
  return true;
}

// Función para sanitizar input
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return sanitizeHtml(input.trim());
}

// Middleware de validación para leads
export function validateLead(data) {
  const errors = [];

  // Validar nombre
  if (!data.nombre) {
    errors.push('El nombre es requerido');
  } else if (!isValidLength(data.nombre, 'nombre')) {
    errors.push(`El nombre debe tener entre ${LIMITS.nombre.min} y ${LIMITS.nombre.max} caracteres`);
  }

  // Validar email
  if (!data.email) {
    errors.push('El email es requerido');
  } else if (!isValidEmail(data.email)) {
    errors.push('El formato del email no es válido');
  } else if (!isValidLength(data.email, 'email')) {
    errors.push(`El email no puede tener más de ${LIMITS.email.max} caracteres`);
  }

  // Validar teléfono (opcional)
  if (data.telefono && !isValidLength(data.telefono, 'telefono')) {
    errors.push(`El teléfono no puede tener más de ${LIMITS.telefono.max} caracteres`);
  }

  // Validar mensaje (si existe)
  if (data.mensaje) {
    if (!isValidLength(data.mensaje, 'mensaje')) {
      errors.push(`El mensaje debe tener entre ${LIMITS.mensaje.min} y ${LIMITS.mensaje.max} caracteres`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      ...data,
      nombre: sanitizeInput(data.nombre),
      email: sanitizeInput(data.email).toLowerCase(),
      telefono: data.telefono ? sanitizeInput(data.telefono) : undefined,
      mensaje: data.mensaje ? sanitizeInput(data.mensaje) : undefined
    }
  };
} 