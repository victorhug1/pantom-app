import fetch from 'node-fetch';

const EMAIL = {
  subject: '¿Tu presencia digital está haciendo crecer tu negocio?',
  html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
    <p>Hola <strong>Víctor</strong>,</p>
    <p>¿Sabías que más del 70% de las PyMEs tienen presencia online, pero menos del 10% la usan estratégicamente?</p>
    <p>Muchas empresas tienen un sitio web, redes sociales y hasta anuncios, pero no ven resultados reales en su negocio.</p>
    <p>¿Te suena familiar?</p>
    <a href="https://calendly.com/digitalstudiopantom" class="cta-btn">Agenda una llamada gratuita</a>
    <div class="footer">
      <p>© 2024 Pantom Digital Studio. Todos los derechos reservados.</p>
      <div class="rrss">
        <a href="https://www.linkedin.com/company/pantom-digital-studio" target="_blank"><img src="https://pantom.net/images/email/linkedin.svg" alt="LinkedIn" /></a>
        <a href="https://www.instagram.com/pantom.digital" target="_blank"><img src="https://pantom.net/images/email/instagram.svg" alt="Instagram" /></a>
      </div>
    </div>
  </div>
</body>
</html>`
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método no permitido' });
  }
  try {
    const response = await fetch('https://api.mailersend.com/v1/email', {
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
    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      const text = await response.text();
      console.error('MailerSend non-JSON response:', response.status, text);
      return res.status(500).json({ success: false, status: response.status, body: text });
    }
    if (!response.ok) {
      console.error('MailerSend error:', data);
      return res.status(500).json({ success: false, error: data });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Catch error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
} 