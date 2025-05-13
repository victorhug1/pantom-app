export default function handler(req, res) {
  res.status(200).json({
    MAILERSEND_API_KEY: process.env.MAILERSEND_API_KEY ? 'Configurada' : 'No configurada',
    MAILERSEND_TEMPLATE_ID: process.env.MAILERSEND_TEMPLATE_ID ? 'Configurado' : 'No configurado',
    MAILERSEND_FROM_EMAIL: process.env.MAILERSEND_FROM_EMAIL ? 'Configurado' : 'No configurado',
    MAILERSEND_FROM_NAME: process.env.MAILERSEND_FROM_NAME ? 'Configurado' : 'No configurado'
  });
} 