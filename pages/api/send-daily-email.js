import clientPromise from '../../lib/mongodb';
import fetch from 'node-fetch';

// Configuración para deshabilitar la protección de Vercel (si es necesario, igual que el otro endpoint)
export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

const DIAS_ENTRE_EMAILS = 2; // Definimos el intervalo entre emails

// Utilidad para sumar días a una fecha
function sumarDias(date, dias) {
  const d = new Date(date);
  d.setDate(d.getDate() + dias);
  return d;
}

// Utilidad para obtener el nombre correcto del lead
function getNombreLead(lead) {
  return lead.representanteLegal || lead.representante_legal || lead.nombre || lead.empresa || 'Emprendedor';
}

// === CONFIGURACIÓN DE EMAILS DEL FUNNEL CON HTML EMBEBIDO ===
const funnelEmails = [
  {
    estadoActual: 'pendiente',
    proximoEstado: 'email1_enviado',
    subject: '¿Tu presencia digital está haciendo crecer tu negocio?',
    html: (nombre) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>¿Tu presencia digital está haciendo crecer tu negocio?</title><link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet"><style>body { background: #111; color: #fff; font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; } .container { max-width: 520px; margin: 0 auto; background: #111; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px #0004; padding: 32px 24px 24px 24px; } .logo { display: block; margin: 0 auto 24px auto; width: 120px; } .banner { width: 100%; max-width: 320px; display: block; margin: 0 auto 24px auto; border-radius: 12px; box-shadow: 0 2px 16px #0003; } h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; text-align: center; color: #fff; } .preheader { color: #ff9800; font-size: 1rem; text-align: center; margin-bottom: 24px; font-weight: 600; } p { font-size: 1.05rem; line-height: 1.6; margin: 0 0 18px 0; color: #e0e0e0; } .cta-btn { display: block; width: 100%; background: #ff9800; color: #fff; text-decoration: none; font-weight: 700; font-size: 1.1rem; padding: 16px 0; border-radius: 8px; text-align: center; margin: 24px 0 16px 0; box-shadow: 0 2px 8px #ff980033; transition: background 0.2s; } .cta-btn:hover { background: #ff7c00; } .footer { text-align: center; margin-top: 32px; color: #aaa; font-size: 0.95rem; } .rrss { margin-top: 12px; } .rrss a { display: inline-block; margin: 0 6px; } .rrss img { width: 24px; vertical-align: middle; } @media (max-width: 600px) { .container { padding: 18px 4vw 18px 4vw; } h1 { font-size: 1.15rem; } .banner { max-width: 100%; } }</style></head><body><div class="container"><img src="https://pantom.net/pantom_logo.svg" alt="Pantom Digital Studio" class="logo" /><img src="https://pantom.net/images/email/descubre-como-empresas-como-la-tuya-estan-creciendo-gracias-a-una-estrategia-digital-clara.png" alt="Presencia digital que crece" class="banner" /><div class="preheader">Más del 70% de las PyMEs tienen presencia online, pero menos del 10% la usan estratégicamente.</div><h1>¿Tu presencia digital está haciendo crecer tu negocio o solo ocupa espacio?</h1><p>Hola <strong>${nombre}</strong>,</p><p>Más del 70% de las PyMEs tienen presencia online, pero menos del 10% la usan estratégicamente para atraer clientes o generar oportunidades reales.<br><br>En <b>Pantom</b>, combinamos estrategia, diseño y tecnología para convertir tu ecosistema digital en una herramienta real de ventas.</p><a href="https://pantom.net/landing-campana1" class="cta-btn">👉 Descubre cómo lo hacemos</a><p style="font-size:0.98rem; color:#bbb; text-align:center;">Si tienes dudas, responde a este correo.<br/>Equipo Pantom</p><div class="footer"><div><a href="mailto:hola@pantom.net" style="color:#ff9800; text-decoration:none; font-weight:600;"><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="18" style="vertical-align:middle; margin-right:4px;" alt="Email" />hola@pantom.net</a></div><div class="rrss"><span style="color:#fff; font-size:0.98rem;">Síguenos:</span><a href="https://www.facebook.com/pantomdigitalstudio/"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a><a href="https://www.instagram.com/pantom_seo/"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" /></a><a href="https://linkedin.com/company/pantom/"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" /></a></div><div style="margin-top:10px; color:#888; font-size:0.92rem;">&copy; 2024 Pantom Digital Studio. Todos los derechos reservados.</div></div></div></body></html>`,
    limit: 25, // Límite por tipo de email por ejecución (no usado directamente en la consulta, pero útil para referencia)
  },
  {
    estadoActual: 'email1_enviado',
    proximoEstado: 'email2_enviado',
    subject: '¿Tu sitio web está frenando tus ventas?',
    html: (nombre) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>¿Tu sitio web está frenando tus ventas?</title><link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet"><style>body { background: #111; color: #fff; font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; } .container { max-width: 520px; margin: 0 auto; background: #111; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px #0004; padding: 32px 24px 24px 24px; } .logo { display: block; margin: 0 auto 24px auto; width: 120px; } .banner { width: 100%; max-width: 320px; display: block; margin: 0 auto 24px auto; border-radius: 12px; box-shadow: 0 2px 16px #0003; } h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; text-align: center; color: #fff; } .preheader { color: #ff9800; font-size: 1rem; text-align: center; margin-bottom: 24px; font-weight: 600; } p { font-size: 1.05rem; line-height: 1.6; margin: 0 0 18px 0; color: #e0e0e0; } .cta-btn { display: block; width: 100%; background: #ff9800; color: #fff; text-decoration: none; font-weight: 700; font-size: 1.1rem; padding: 16px 0; border-radius: 8px; text-align: center; margin: 24px 0 16px 0; box-shadow: 0 2px 8px #ff980033; transition: background 0.2s; } .cta-btn:hover { background: #ff7c00; } .sello { display: flex; align-items: center; justify-content: center; background: #222; color: #ff9800; font-size: 0.95rem; border-radius: 6px; padding: 8px 16px; margin: 0 auto 24px auto; width: fit-content; font-weight: 600; gap: 8px; } .footer { text-align: center; margin-top: 32px; color: #aaa; font-size: 0.95rem; } .rrss { margin-top: 12px; } .rrss a { display: inline-block; margin: 0 6px; } .rrss img { width: 24px; vertical-align: middle; } @media (max-width: 600px) { .container { padding: 18px 4vw 18px 4vw; } h1 { font-size: 1.15rem; } .banner { max-width: 100%; } }</style></head><body><div class="container"><img src="https://pantom.net/pantom_logo.svg" alt="Pantom Digital Studio" class="logo" /><img src="https://pantom.net/images/email/mockup-guia-errores-b2b.png" alt="Guía PDF: 7 errores silenciosos" class="banner" /><div class="preheader">7 errores silenciosos que afectan a sitios B2B (y cómo solucionarlos esta semana)</div><h1>¿Tu sitio web está frenando tus ventas y ni siquiera lo sabías?</h1><p>Hola <strong>${nombre}</strong>,</p><p>Tu sitio web es tu mejor vendedor… o tu peor saboteador.<br>En nuestros análisis, hemos detectado que más del 80% de los sitios B2B cometen los mismos errores sin saberlo.<br><br>Y lo peor: no es por diseño, sino por estrategia.<br>Por eso, preparamos esta guía directa y sin rodeos:</p><p style="text-align:center; font-weight:600; color:#fff; margin: 18px 0 8px 0;">📘 \"7 errores silenciosos que están frenando el crecimiento de tu sitio web B2B\"</p><p style="text-align:center; color:#e0e0e0;">Te explicamos cómo identificarlos y qué hacer, <b>sin necesidad de rehacer todo desde cero.</b></p><a href="https://pantom.net/landing-guia-errores-b2b" class="cta-btn">👉 Descargar Guía Gratis</a><div class="sello"><img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" width="20" alt="Sello" />200+ sitios B2B auditados en Latinoamérica</div><p style="font-size:0.98rem; color:#bbb; text-align:center;">Es gratis, y si después quieres que miremos tu sitio juntos, podemos hacerlo sin compromiso.</p><div class="footer"><div><a href="mailto:hola@pantom.net" style="color:#ff9800; text-decoration:none; font-weight:600;"><img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="18" style="vertical-align:middle; margin-right:4px;" alt="Email" />hola@pantom.net</a></div><div class="rrss"><span style="color:#fff; font-size:0.98rem;">Síguenos:</span><a href="https://www.facebook.com/pantomdigitalstudio/"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a><a href="https://www.instagram.com/pantom_seo/"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" /></a><a href="https://linkedin.com/company/pantom/"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" /></a></div><div style="margin-top:10px; color:#888; font-size:0.92rem;">&copy; 2024 Pantom Digital Studio. Todos los derechos reservados.</div></div></div></body></html>`,
    limit: 25,
  },
  {
    estadoActual: 'email2_enviado',
    proximoEstado: 'completado',
    subject: '¿Hablamos esta semana?',
    html: (nombre) => `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>¿Hablamos esta semana?</title><link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet"><style>body { background: #111; color: #fff; font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; } .container { max-width: 520px; margin: 0 auto; background: #111; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px #0004; padding: 32px 24px 24px 24px; } .logo { display: block; margin: 0 auto 24px auto; width: 120px; } h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; text-align: center; color: #fff; } .preheader { color: #ea5a19; font-size: 1rem; text-align: center; margin-bottom: 24px; font-weight: 600; } p { font-size: 1.05rem; line-height: 1.6; margin: 0 0 18px 0; color: #e0e0e0; } ul { margin: 0 0 18px 24px; color: #fff; } .cta-btn { display: block; width: 100%; background: #ea5a19; color: #fff; text-decoration: none; font-weight: 700; font-size: 1.1rem; padding: 16px 0; border-radius: 8px; text-align: center; margin: 24px 0 16px 0; box-shadow: 0 2px 8px #ea5a1933; transition: background 0.2s; } .cta-btn:hover { background: #ff7c00; } .footer { text-align: center; margin-top: 32px; color: #aaa; font-size: 0.95rem; } .rrss { margin-top: 12px; } .rrss a { display: inline-block; margin: 0 6px; } .rrss img { width: 24px; vertical-align: middle; } .contacto { margin-top: 18px; color: #fff; font-size: 1rem; } .contacto a { color: #ea5a19; text-decoration: none; font-weight: 600; } @media (max-width: 600px) { .container { padding: 18px 4vw 18px 4vw; } h1 { font-size: 1.15rem; } }</style></head><body><div class="container"><img src="https://pantom.net/pantom_logo.svg" alt="Pantom Digital Studio" class="logo" /><div class="preheader">¿Pantom puede ayudarte a crecer?</div><h1>¿Hablamos esta semana?</h1><p>Hola <strong>${nombre}</strong>,</p><p>Sabemos que el tiempo es oro, por eso vamos al punto:</p><p>En <b>Pantom</b>, diseñamos estrategias digitales a medida que convierten visitas en clientes. Si buscás resultados reales en desarrollo web, datos, SEO o estrategia digital, esta es tu oportunidad.</p><ul><li>Acelerar tus ventas online.</li><li>Mejorar el rendimiento de tu web.</li><li>Automatizar tus procesos con inteligencia de datos.</li></ul><p>Sin fórmulas vacías ni promesas infladas. Solo soluciones concretas adaptadas a tu negocio.</p><a href="https://calendly.com/digitalstudiopantom" class="cta-btn">Quiero mi estrategia personalizada</a><div class="contacto">O escríbenos a <a href="mailto:hola@pantom.net">hola@pantom.net</a> o por WhatsApp: <a href="https://wa.me/573002123456">+57 300 212 3456</a></div><div class="footer"><div class="rrss"><span style="color:#fff; font-size:0.98rem;">Síguenos:</span><a href="https://www.facebook.com/pantomdigitalstudio/"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a><a href="https://www.instagram.com/pantom_seo/"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" /></a><a href="https://linkedin.com/company/pantom/"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" /></a></div><div style="margin-top:10px; color:#888; font-size:0.92rem;">&copy; 2024 Pantom Digital Studio. Todos los derechos reservados.</div></div></div></body></html>`,
    limit: 25,
  }
];
// ===========================================================

export default async function handler(req, res) {
  // === VERIFICACIÓN DE SEGURIDAD ===
  // Obtener el token de todas las posibles fuentes (headers, query)
  const token =
    req.headers['x-cron-secret'] ||
    req.headers['X-Cron-Secret'] ||
    req.headers['x-cronsecret'] ||
    req.headers['x-cron_secret'] ||
    req.query.token ||
    req.query.TOKEN ||
    req.query.Token;

  // Verificar el token
  if (!token || token !== process.env.FUNNEL_CRON_TOKEN) {
    console.log('Token inválido o no proporcionado');
    return res.status(401).json({
      success: false,
      message: 'No autorizado - Token inválido',
      debug: {
        tokenRecibido: token,
        tokenEsperado: process.env.FUNNEL_CRON_TOKEN,
        headers: req.headers,
        query: req.query
      }
    });
  }
  // ===============================

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const db = client.db('pantom-app');

    const results = {
      totalEnviados: 0,
      errores: [],
      detalles: {}
    };

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // === PROCESO DE ENVÍO ===
    // Iteramos sobre los leads elegibles (hasta el límite diario total)
    // Buscamos leads que no estén 'completado' y cuya fecha de próximo envío sea hoy o anterior, o sea null
    const leadsToSend = await db.collection('leads')
      .find({
        estado_funnel: { $ne: 'completado' },
        $or: [
          { proximo_envio: { $lte: hoy } },
          { proximo_envio: null }
        ]
      })
      .limit(50) // Límite total de leads a procesar por ejecución del cron (50 diarios)
      .toArray();

    console.log(`Leads elegibles encontrados para hoy: ${leadsToSend.length}`);

    if (leadsToSend.length === 0) {
      results.message = 'No hay leads elegibles para envío hoy.';
      return res.status(200).json({ success: true, ...results });
    }

    let emailsSentToday = 0;

    for (const lead of leadsToSend) {
        if (emailsSentToday >= 50) { // Verificación adicional del límite total por si acaso
            console.log('Límite diario de 50 emails alcanzado.');
            break; // Salir del bucle si se alcanza el límite diario
        }

        // Encontrar la configuración del email que corresponde al estado actual del lead
        const currentEmailConfig = funnelEmails.find(config => config.estadoActual === lead.estado_funnel);

        if (!currentEmailConfig) {
            // Si el lead tiene un estado que no está en la configuración, lo saltamos.
            // Esto podría ocurrir si el estado es 'completado' (ya filtrado arriba) o algún otro estado inesperado.
            console.log(`Saltando lead ${lead.email} con estado desconocido: ${lead.estado_funnel}`);
            continue;
        }

        // Verificar si el lead ya ha recibido este email hoy (doble check)
        const lastSentDate = lead.fecha_ultimo_envio ? new Date(lead.fecha_ultimo_envio) : null;
        const lastSentToday = lastSentDate && lastSentDate.toDateString() === hoy.toDateString();

        if (lastSentToday) {
             console.log(`Lead ${lead.email} ya recibió el email de estado ${lead.estado_funnel} hoy. Saltando.`);
             continue;
        }

        try {
          // === ENVIO DEL EMAIL CON MAILERSEND USANDO HTML ===
          const mailerResponse = await fetch('https://api.mailersend.com/v1/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
            },
            body: JSON.stringify({
              from: {
                email: process.env.MAILERSEND_FROM_EMAIL,
                name: process.env.MAILERSEND_FROM_NAME
              },
              to: [{
                email: lead.email,
                name: getNombreLead(lead)
              }],
              // En lugar de template_id, usamos html
              html: currentEmailConfig.html(getNombreLead(lead)), // Pasamos el nombre al generador de HTML
              subject: currentEmailConfig.subject // Usamos el subject de la configuración actual
            })
          });

          if (!mailerResponse.ok) {
            const errorBody = await mailerResponse.text();
            throw new Error(`Error en MailerSend: ${mailerResponse.status} ${mailerResponse.statusText}. Detalles: ${errorBody}`);
          }

          // === ACTUALIZAR LEAD DESPUÉS DEL ENVÍO ===
          const proximoEnvio = currentEmailConfig.proximoEstado === 'completado'
            ? null // No hay próximo envío si el funnel está completo
            : sumarDias(new Date(), DIAS_ENTRE_EMAILS); // Calcular la fecha del próximo envío

          await db.collection('leads').updateOne(
            { _id: lead._id },
            {
              $set: {
                estado_funnel: currentEmailConfig.proximoEstado, // Mover al próximo estado
                fecha_ultimo_envio: new Date(), // Registrar fecha de envío
                proximo_envio: proximoEnvio // Registrar fecha del próximo envío
              }
            }
          );

          results.totalEnviados++;
          emailsSentToday++;
          console.log(`Email de estado ${currentEmailConfig.estadoActual} enviado exitosamente a ${lead.email}. Próximo estado: ${currentEmailConfig.proximoEstado}. Próximo envío: ${proximoEnvio}`);

        } catch (err) {
          console.error(`Error procesando lead ${lead.email} para email de estado ${lead.estadoActual}:`, err);
          results.errores.push({
            email: lead.email,
            estado_funnel: lead.estado_funnel,
            error: err.message
          });
        }
      }

    results.message = `Proceso de envío diario finalizado. Enviados hoy: ${results.totalEnviados}.`;
    return res.status(200).json({
      success: true,
      ...results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en el endpoint /api/send-daily-email:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 