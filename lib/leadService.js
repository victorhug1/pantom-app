import { sendWelcomeEmail } from './mailer';
import Lead from '../models/Lead';

export async function createOrUpdateLead(data) {
  try {
    const {
      nombre,
      email,
      telefono,
      fuente,
      etiquetas = [],
      metadata = {}
    } = data;

    // Buscar lead existente
    let lead = await Lead.findOne({ email });

    if (lead) {
      // Actualizar lead existente
      lead.nombre = nombre || lead.nombre;
      lead.telefono = telefono || lead.telefono;
      lead.etiquetas = [...new Set([...lead.etiquetas, ...etiquetas])];
      lead.metadata = { ...lead.metadata, ...metadata };
      lead.ultimaInteraccion = {
        tipo: 'actualizacion',
        fecha: new Date(),
        detalles: { fuente }
      };
    } else {
      // Crear nuevo lead
      lead = new Lead({
        nombre,
        email,
        telefono,
        fuente,
        etiquetas,
        metadata,
        pasosDelFunnel: [{
          paso: 'registro',
          fecha: new Date(),
          metadata: { fuente }
        }],
        ultimaInteraccion: {
          tipo: 'registro',
          fecha: new Date(),
          detalles: { fuente }
        }
      });
    }

    await lead.save();
    return lead;
  } catch (error) {
    console.error('Error en createOrUpdateLead:', error);
    throw error;
  }
}

export async function updateLeadSegment(email, newSegment, metadata = {}) {
  try {
    const lead = await Lead.findOne({ email });
    if (!lead) throw new Error('Lead no encontrado');

    lead.segmento = newSegment;
    lead.pasosDelFunnel.push({
      paso: `cambio_segmento_${newSegment}`,
      fecha: new Date(),
      metadata
    });
    lead.ultimaInteraccion = {
      tipo: 'cambio_segmento',
      fecha: new Date(),
      detalles: { nuevoSegmento: newSegment, ...metadata }
    };

    await lead.save();
    return lead;
  } catch (error) {
    console.error('Error en updateLeadSegment:', error);
    throw error;
  }
}

export async function handleNewsletterSubscription(data) {
  try {
    // Crear o actualizar lead
    const lead = await createOrUpdateLead({
      ...data,
      fuente: 'newsletter',
      etiquetas: ['newsletter', 'lead_frio']
    });

    // Enviar email de bienvenida
    await sendWelcomeEmail({
      to: lead.email,
      name: lead.nombre
    });

    return lead;
  } catch (error) {
    console.error('Error en handleNewsletterSubscription:', error);
    throw error;
  }
}

export async function handleContactForm(data) {
  try {
    // Crear o actualizar lead
    const lead = await createOrUpdateLead({
      ...data,
      fuente: 'contacto',
      etiquetas: ['contacto', 'lead_tibio']
    });

    // Aquí podrías agregar lógica adicional para el formulario de contacto
    // Por ejemplo, enviar notificación al equipo, etc.

    return lead;
  } catch (error) {
    console.error('Error en handleContactForm:', error);
    throw error;
  }
} 