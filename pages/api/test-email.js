import { MailerSend, EmailParams, Sender } from "mailersend";

// Log temporal para depuración
console.log('MAILERSEND_API_KEY está definida:', !!process.env.MAILERSEND_API_KEY);
console.log('Longitud de la API Key:', process.env.MAILERSEND_API_KEY ? process.env.MAILERSEND_API_KEY.length : 0);

const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  const { email = 'victorhug1@hotmail.com', nombre = 'Victor' } = req.body;

  try {
    // Enviar email 1
    const email1Params = new EmailParams()
      .setFrom(new Sender("hola@pantom.net", "Pantom Digital Studio"))
      .setTo([{ email, name: nombre }])
      .setSubject("¿Tu presencia digital está haciendo crecer tu negocio?")
      .setHtml(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>¿Tu presencia digital está haciendo crecer tu negocio?</title>
          <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet">
          <style>
            body { background: #111; color: #fff; font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 520px; margin: 0 auto; background: #111; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px #0004; padding: 32px 24px 24px 24px; }
            .logo { display: block; margin: 0 auto 24px auto; width: 120px; }
            .banner { width: 100%; max-width: 320px; display: block; margin: 0 auto 24px auto; border-radius: 12px; box-shadow: 0 2px 16px #0003; }
            h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; text-align: center; color: #fff; }
            .preheader { color: #ff9800; font-size: 1rem; text-align: center; margin-bottom: 24px; font-weight: 600; }
            p { font-size: 1.05rem; line-height: 1.6; margin: 0 0 18px 0; color: #e0e0e0; }
            .cta-btn { display: block; width: 100%; background: #ff9800; color: #fff; text-decoration: none; font-weight: 700; font-size: 1.1rem; padding: 16px 0; border-radius: 8px; text-align: center; margin: 24px 0 16px 0; box-shadow: 0 2px 8px #ff980033; transition: background 0.2s; }
            .cta-btn:hover { background: #ff7c00; }
            .footer { text-align: center; margin-top: 32px; color: #aaa; font-size: 0.95rem; }
            .rrss { margin-top: 12px; }
            .rrss a { display: inline-block; margin: 0 6px; }
            .rrss img { width: 24px; vertical-align: middle; }
            @media (max-width: 600px) { .container { padding: 18px 4vw 18px 4vw; } h1 { font-size: 1.15rem; } .banner { max-width: 100%; } }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://pantom.net/pantom_logo.svg" alt="Pantom Digital Studio" class="logo" />
            <img src="https://pantom.net/images/email/descubre-como-empresas-como-la-tuya-estan-creciendo-gracias-a-una-estrategia-digital-clara.png" alt="Presencia digital que crece" class="banner" />
            <div class="preheader">Más del 70% de las PyMEs tienen presencia online, pero menos del 10% la usan estratégicamente.</div>
            <h1>¿Tu presencia digital está haciendo crecer tu negocio o solo ocupa espacio?</h1>
            <p>Hola <strong>${nombre}</strong>,</p>
            <p>¿Sabías que más del 70% de las PyMEs tienen presencia online, pero menos del 10% la usan estratégicamente para atraer clientes o generar oportunidades reales?</p>
            <p>Si tu sitio web solo ocupa espacio en internet y no está generando resultados, no estás solo. Pero hay una solución.</p>
            <a href="https://pantom.net/landing-guia-errores-b2b" class="cta-btn">Descarga la guía gratis</a>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Pantom Digital Studio. Todos los derechos reservados.</p>
              <div class="rrss">
                <a href="https://www.facebook.com/pantomdigitalstudio/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/pantom_seo/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" />
                </a>
                <a href="https://linkedin.com/company/pantom/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);

    await mailersend.email.send(email1Params);
    console.log('Email 1 enviado');

    // Enviar email 2
    const email2Params = new EmailParams()
      .setFrom(new Sender("hola@pantom.net", "Pantom Digital Studio"))
      .setTo([{ email, name: nombre }])
      .setSubject("¿Tu sitio web está frenando tus ventas?")
      .setHtml(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>¿Tu sitio web está frenando tus ventas?</title>
          <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet">
          <style>
            body { background: #111; color: #fff; font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 520px; margin: 0 auto; background: #111; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px #0004; padding: 32px 24px 24px 24px; }
            .logo { display: block; margin: 0 auto 24px auto; width: 120px; }
            .banner { width: 100%; max-width: 320px; display: block; margin: 0 auto 24px auto; border-radius: 12px; box-shadow: 0 2px 16px #0003; }
            h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; text-align: center; color: #fff; }
            .preheader { color: #ff9800; font-size: 1rem; text-align: center; margin-bottom: 24px; font-weight: 600; }
            p { font-size: 1.05rem; line-height: 1.6; margin: 0 0 18px 0; color: #e0e0e0; }
            .cta-btn { display: block; width: 100%; background: #ff9800; color: #fff; text-decoration: none; font-weight: 700; font-size: 1.1rem; padding: 16px 0; border-radius: 8px; text-align: center; margin: 24px 0 16px 0; box-shadow: 0 2px 8px #ff980033; transition: background 0.2s; }
            .cta-btn:hover { background: #ff7c00; }
            .sello { display: flex; align-items: center; justify-content: center; background: #222; color: #ff9800; font-size: 0.95rem; border-radius: 6px; padding: 8px 16px; margin: 0 auto 24px auto; width: fit-content; font-weight: 600; gap: 8px; }
            .footer { text-align: center; margin-top: 32px; color: #aaa; font-size: 0.95rem; }
            .rrss { margin-top: 12px; }
            .rrss a { display: inline-block; margin: 0 6px; }
            .rrss img { width: 24px; vertical-align: middle; }
            @media (max-width: 600px) { .container { padding: 18px 4vw 18px 4vw; } h1 { font-size: 1.15rem; } .banner { max-width: 100%; } }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://pantom.net/pantom_logo.svg" alt="Pantom Digital Studio" class="logo" />
            <img src="https://pantom.net/images/email/mockup-guia-errores-b2b.png" alt="Guía PDF: 7 errores silenciosos" class="banner" />
            <div class="preheader">7 errores silenciosos que afectan a sitios B2B (y cómo solucionarlos esta semana)</div>
            <h1>¿Tu sitio web está frenando tus ventas y ni siquiera lo sabías?</h1>
            <p>Hola <strong>${nombre}</strong>,</p>
            <p>¿Sabías que hay 7 errores silenciosos que están frenando las ventas de tu sitio web B2B?</p>
            <p>La mayoría de los sitios B2B cometen estos errores sin saberlo, y por eso no logran convertir visitantes en clientes.</p>
            <div class="sello">
              <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="Sello" width={28} />
              <span>200+ sitios B2B auditados en Latinoamérica</span>
            </div>
            <a href="https://pantom.net/landing-guia-errores-b2b" class="cta-btn">Descarga la guía gratis</a>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Pantom Digital Studio. Todos los derechos reservados.</p>
              <div class="rrss">
                <a href="https://www.facebook.com/pantomdigitalstudio/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/pantom_seo/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" />
                </a>
                <a href="https://linkedin.com/company/pantom/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);

    await mailersend.email.send(email2Params);
    console.log('Email 2 enviado');

    // Enviar email 3
    const email3Params = new EmailParams()
      .setFrom(new Sender("hola@pantom.net", "Pantom Digital Studio"))
      .setTo([{ email, name: nombre }])
      .setSubject("¿Hablamos esta semana?")
      .setHtml(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>¿Hablamos esta semana?</title>
          <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet">
          <style>
            body { background: #111; color: #fff; font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 520px; margin: 0 auto; background: #111; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px #0004; padding: 32px 24px 24px 24px; }
            .logo { display: block; margin: 0 auto 24px auto; width: 120px; }
            .banner { width: 100%; max-width: 320px; display: block; margin: 0 auto 24px auto; border-radius: 12px; box-shadow: 0 2px 16px #0003; }
            h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; text-align: center; color: #fff; }
            .preheader { color: #ff9800; font-size: 1rem; text-align: center; margin-bottom: 24px; font-weight: 600; }
            p { font-size: 1.05rem; line-height: 1.6; margin: 0 0 18px 0; color: #e0e0e0; }
            .cta-btn { display: block; width: 100%; background: #ff9800; color: #fff; text-decoration: none; font-weight: 700; font-size: 1.1rem; padding: 16px 0; border-radius: 8px; text-align: center; margin: 24px 0 16px 0; box-shadow: 0 2px 8px #ff980033; transition: background 0.2s; }
            .cta-btn:hover { background: #ff7c00; }
            .footer { text-align: center; margin-top: 32px; color: #aaa; font-size: 0.95rem; }
            .rrss { margin-top: 12px; }
            .rrss a { display: inline-block; margin: 0 6px; }
            .rrss img { width: 24px; vertical-align: middle; }
            @media (max-width: 600px) { .container { padding: 18px 4vw 18px 4vw; } h1 { font-size: 1.15rem; } .banner { max-width: 100%; } }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://pantom.net/pantom_logo.svg" alt="Pantom Digital Studio" class="logo" />
            <img src="https://pantom.net/images/email/mockup-guia-errores-b2b.png" alt="Guía PDF: 7 errores silenciosos" class="banner" />
            <div class="preheader">¿Necesitas ayuda para implementar los cambios en tu sitio?</div>
            <h1>¿Hablamos esta semana?</h1>
            <p>Hola <strong>${nombre}</strong>,</p>
            <p>Espero que la guía te haya sido útil para identificar los errores en tu sitio web.</p>
            <p>Si necesitas ayuda para implementar los cambios o tienes dudas sobre cómo mejorar tu presencia digital, podemos agendar una llamada gratuita.</p>
            <a href="https://calendly.com/digitalstudiopantom" class="cta-btn">Agendar llamada gratuita</a>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Pantom Digital Studio. Todos los derechos reservados.</p>
              <div class="rrss">
                <a href="https://www.facebook.com/pantomdigitalstudio/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/pantom_seo/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" />
                </a>
                <a href="https://linkedin.com/company/pantom/" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `);

    await mailersend.email.send(email3Params);
    console.log('Email 3 enviado');

    return res.status(200).json({ 
      success: true, 
      message: 'Emails de prueba enviados correctamente',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error enviando emails de prueba:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error enviando emails de prueba',
      error: error && (error.message || JSON.stringify(error)),
      stack: error && error.stack,
      raw: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      timestamp: new Date().toISOString()
    });
  }
} 