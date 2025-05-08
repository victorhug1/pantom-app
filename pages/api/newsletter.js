import axios from 'axios';

const MAILERSEND_API_KEY = 'mlsn.f4b3dab0872b733e9d404cdd0e12093cee5cc380a7601ee4896b769826210edc';
const MAILERSEND_API_URL = 'https://api.mailersend.com/v1';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Crear contacto en MailerSend
    const response = await axios.post(
      `${MAILERSEND_API_URL}/contacts`,
      {
        email: email,
        first_name: name,
        lists: ['newsletter'] // Asegúrate de crear esta lista en MailerSend
      },
      {
        headers: {
          'Authorization': `Bearer ${MAILERSEND_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error.response?.data || error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Error subscribing to newsletter',
      error: error.response?.data || error.message
    });
  }
} 