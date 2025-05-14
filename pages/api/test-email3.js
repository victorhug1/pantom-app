import fetch from 'node-fetch';

const EMAIL = {
  subject: '¿Hablamos esta semana?',
  html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>¿Hablamos esta semana?</title><link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet"><style>body { background: #181818; color: #fff; font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; } .container { max-width: 520px; margin: 0 auto; background: #23272f; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px #0004; padding: 32px 24px 24px 24px; background-image: url('https://pantom.net/background_pantom.svg'); background-size: cover; background-position: center; position: relative; } .logo { display: block; margin: 0 auto 24px auto; width: 120px; } h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 16px 0; text-align: center; color: #fff; } .preheader { color: #ea5a19; font-size: 1rem; text-align: center; margin-bottom: 24px; font-weight: 600; } p { font-size: 1.05rem; line-height: 1.6; margin: 0 0 18px 0; color: #e0e0e0; } ul { margin: 0 0 18px 24px; color: #fff; } .cta-btn { display: block; width: 100%; background: #ea5a19; color: #fff; text-decoration: none; font-weight: 700; font-size: 1.1rem; padding: 16px 0; border-radius: 8px; text-align: center; margin: 24px 0 16px 0; box-shadow: 0 2px 8px #ea5a1933; transition: background 0.2s; } .cta-btn:hover { background: #ff7c00; } .footer { text-align: center; margin-top: 32px; color: #aaa; font-size: 0.95rem; } .rrss { margin-top: 12px; } .rrss a { display: inline-block; margin: 0 6px; } .rrss img { width: 24px; vertical-align: middle; } .contacto { margin-top: 18px; color: #fff; font-size: 1rem; } .contacto a { color: #ea5a19; text-decoration: none; font-weight: 600; } @media (max-width: 600px) { .container { padding: 18px 4vw 18px 4vw; } h1 { font-size: 1.15rem; } }</style></head><body><div class="container"><img src="https://pantom.net/pantom_logo.svg" alt="Pantom Digital Studio" class="logo" /><div class="preheader">¿Pantom puede ayudarte a crecer?</div><h1>¿Hablamos esta semana?</h1><p>Hola <strong>Víctor</strong>,</p><p>Sabemos que el tiempo es oro, por eso vamos al punto:</p><p>En <b>Pantom</b>, diseñamos estrategias digitales a medida que convierten visitas en clientes. Si buscás resultados reales en desarrollo web, datos, SEO o estrategia digital, esta es tu oportunidad.</p><ul><li>Acelerar tus ventas online.</li><li>Mejorar el rendimiento de tu web.</li><li>Automatizar tus procesos con inteligencia de datos.</li></ul><p>Sin fórmulas vacías ni promesas infladas. Solo soluciones concretas adaptadas a tu negocio.</p><a href="https://calendly.com/digitalstudiopantom" class="cta-btn">Quiero mi estrategia personalizada</a><div class="contacto">O escríbenos a <a href="mailto:hola@pantom.net">hola@pantom.net</a> o por WhatsApp: <a href="https://wa.me/573002123456">+57 300 212 3456</a></div><div class="footer"><div class="rrss"><span style="color:#fff; font-size:0.98rem;">Síguenos:</span><a href="https://www.facebook.com/pantomdigitalstudio/"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a><a href="https://www.instagram.com/pantom_seo/"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" /></a><a href="https://linkedin.com/company/pantom/"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" /></a></div><div style="margin-top:10px; color:#888; font-size:0.92rem;">&copy; 2024 Pantom Digital Studio. Todos los derechos reservados.</div></div></div></body></html>`
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }

  try {
    await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERSEND_API_KEY}`
      },
      body: JSON.stringify({
        from: { email: 'hola@pantom.net', name: 'Pantom Digital Studio' },
        to: [{ email: 'victorhug1@hotmail.com', name: 'Víctor' }],
        subject: EMAIL.subject,
        html: EMAIL.html
      })
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
} 