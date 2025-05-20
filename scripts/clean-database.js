import clientPromise from '../lib/mongodb';

async function cleanDatabase() {
  try {
    console.log('Conectando a MongoDB...');
    const client = await clientPromise;
    const db = client.db('pantom-app');
    const collection = db.collection('leads');

    // 1. Contar total de leads
    const totalLeads = await collection.countDocuments();
    console.log(`Total de leads en la base de datos: ${totalLeads}`);

    // 2. Encontrar leads sin email
    const leadsSinEmail = await collection.find({
      $or: [
        { email: { $exists: false } },
        { email: null },
        { email: '' }
      ]
    }).toArray();

    console.log(`Leads sin email encontrados: ${leadsSinEmail.length}`);

    // 3. Eliminar leads sin email
    if (leadsSinEmail.length > 0) {
      const result = await collection.deleteMany({
        $or: [
          { email: { $exists: false } },
          { email: null },
          { email: '' }
        ]
      });
      console.log(`Leads eliminados: ${result.deletedCount}`);
    }

    // 4. Actualizar estado_funnel para leads con email pero sin estado
    const result = await collection.updateMany(
      {
        email: { $exists: true, $ne: '' },
        estado_funnel: { $exists: false }
      },
      {
        $set: {
          estado_funnel: 'pendiente',
          fecha_creacion: new Date(),
          fecha_ultimo_envio: null,
          proximo_envio: new Date()
        }
      }
    );

    console.log(`Leads actualizados con estado inicial: ${result.modifiedCount}`);

    // 5. Estadísticas finales
    const leadsValidos = await collection.countDocuments({
      email: { $exists: true, $ne: '' }
    });

    console.log('\nResumen final:');
    console.log(`- Total inicial: ${totalLeads}`);
    console.log(`- Leads eliminados: ${leadsSinEmail.length}`);
    console.log(`- Leads válidos: ${leadsValidos}`);

    // 6. Distribución por estado
    const estados = await collection.aggregate([
      {
        $group: {
          _id: '$estado_funnel',
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    console.log('\nDistribución por estado:');
    estados.forEach(estado => {
      console.log(`- ${estado._id || 'sin estado'}: ${estado.count}`);
    });

  } catch (error) {
    console.error('Error durante la limpieza:', error);
  } finally {
    process.exit(0);
  }
}

cleanDatabase(); 