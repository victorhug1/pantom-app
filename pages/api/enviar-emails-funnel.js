import clientPromise from '../../lib/mongodb';
import fetch from 'node-fetch';

// LOGS DE DEPURACIÓN
console.log('TOKEN ENV:', process.env.FUNNEL_CRON_TOKEN);

const TEMPLATES = {
  pendiente: 'TEMPLATE_ID_1', // Reemplaza con el ID real de MailerSend para el primer email
  email_1: 'TEMPLATE_ID_2',   // Segundo email
  email_2: 'TEMPLATE_ID_3',   // Tercer email
};

const DIAS_ENTRE_EMAILS = 2;

function sumarDias(date, dias) {
  const d = new Date(date);
  d.setDate(d.getDate() + dias);
  return d;
}

export default async function handler(req, res) {
  // LOGS DE DEPURACIÓN
  console.log('TOKEN HEADER:', req.headers.authorization);

  // Protección simple: solo POST y con token
  if (req.method !== 'POST' || req.headers.authorization !== `Bearer ${process.env.FUNNEL_CRON_TOKEN}`) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  const client = await clientPromise;
  const db = client.db('pantom-app');
  const collection = db.collection('leads');
  const hoy = new Date();

  // Buscar hasta 100 leads pendientes de envío
  const leads = await collection.find({
    estado_funnel: { $ne: 'completado' },
    $or: [
      { proximo_envio: { $lte: hoy } },
      { proximo_envio: null }
    ]
  }).limit(100).toArray();

  let enviados = 0;
  let errores = [];

  for (const lead of leads) {
    let nuevoEstado = '';
    let templateId = '';
    if (lead.estado_funnel === 'pendiente') {
      nuevoEstado = 'email_1';
      templateId = TEMPLATES.pendiente;
    } else if (lead.estado_funnel === 'email_1') {
      nuevoEstado = 'email_2';
      templateId = TEMPLATES.email_1;
    } else if (lead.estado_funnel === 'email_2') {
      nuevoEstado = 'completado';
      templateId = TEMPLATES.email_2;
    } else {
      continue;
    }

    // Enviar email con MailerSend
    try {
      await fetch('https://api.mailersend.com/v1/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
        },
        body: JSON.stringify({
          from: { email: 'hola@pantom.net', name: 'Pantom Digital Studio' },
          to: [{ email: lead.email, name: lead.nombre }],
          template_id: templateId,
          variables: [
            {
              email: lead.email,
              substitutions: [
                { var: 'nombre', value: lead.nombre }
              ]
            }
          ]
        })
      });

      // Calcular próxima fecha
      let proximoEnvio = null;
      if (nuevoEstado !== 'completado') {
        proximoEnvio = sumarDias(hoy, DIAS_ENTRE_EMAILS);
      }

      // Actualizar lead
      await collection.updateOne(
        { _id: lead._id },
        {
          $set: {
            estado_funnel: nuevoEstado,
            fecha_ultimo_envio: hoy,
            proximo_envio: proximoEnvio
          }
        }
      );
      enviados++;
    } catch (err) {
      errores.push({ email: lead.email, error: err.message });
    }
  }

  return res.status(200).json({ success: true, enviados, errores });
} 