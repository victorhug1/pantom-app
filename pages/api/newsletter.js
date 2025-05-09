import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { email, name, source = 'unknown', tags = [], lang = 'es' } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('newsletter');
    const doc = {
      email,
      name,
      createdAt: new Date(),
      source,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
      status: 'active',
      tags,
      lang
    };
    await collection.insertOne(doc);
    res.status(200).json({ success: true, message: 'Suscripción guardada', data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
} 