require('dotenv').config({ path: '.env' });
const clientPromise = require('../lib/mongodb').default;

(async () => {
  const client = await clientPromise;
  const db = client.db('pantom-app');
  const collection = db.collection('leads');

  // Actualiza solo los leads que no tienen los campos de control
  const result = await collection.updateMany(
    {
      $or: [
        { estado_funnel: { $exists: false } },
        { fecha_ultimo_envio: { $exists: false } },
        { proximo_envio: { $exists: false } }
      ]
    },
    {
      $set: {
        estado_funnel: 'pendiente',
        fecha_ultimo_envio: null,
        proximo_envio: null
      }
    }
  );

  console.log(`Leads actualizados: ${result.modifiedCount}`);
  process.exit(0);
})(); 