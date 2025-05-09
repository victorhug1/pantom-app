import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('pantom-test');
    const collection = db.collection('test');
    const docs = await collection.find({}).limit(10).toArray();
    res.status(200).json({ success: true, data: docs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
} 