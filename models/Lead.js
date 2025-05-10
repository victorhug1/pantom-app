import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true
  },
  telefono: {
    type: String,
    trim: true
  },
  fuente: {
    type: String,
    enum: ['web', 'newsletter', 'contacto', 'referido', 'otro'],
    default: 'web'
  },
  segmento: {
    type: String,
    enum: ['frio', 'tibio', 'caliente'],
    default: 'frio'
  },
  etiquetas: [{
    type: String
  }],
  pasosDelFunnel: [{
    paso: String,
    fecha: Date,
    metadata: mongoose.Schema.Types.Mixed
  }],
  ultimaInteraccion: {
    tipo: String,
    fecha: Date,
    detalles: mongoose.Schema.Types.Mixed
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'convertido'],
    default: 'activo'
  },
  metadata: {
    ip: String,
    userAgent: String,
    origen: String,
    utmParams: mongoose.Schema.Types.Mixed
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar fechaActualizacion
LeadSchema.pre('save', function(next) {
  this.fechaActualizacion = new Date();
  next();
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema); 