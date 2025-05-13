const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI no está definida en el archivo .env.local');
  process.exit(1);
}

const DB_NAME = 'pantom-app';
const COLLECTION_NAME = 'leads';

async function importLeadsFromCSV(filePath) {
  const client = new MongoClient(MONGODB_URI);
  const leads = [];

  try {
    // Leer el archivo CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          // Verificar que al menos tengamos un email válido
          if (data.correo_electrónico_comercial) {
            const lead = {
              // Información básica
              nombre: data.razón_social || data.sigla || 'Sin nombre',
              email: data.correo_electrónico_comercial,
              segmento: 'empresa', // Por defecto, ya que son empresas
              
              // Información de la empresa
              nit: data.nit_cc,
              tipoOrganizacion: data.tipo_de_organización,
              representanteLegal: data.representante_legal,
              
              // Información de contacto
              direccion: data.dirección,
              telefono1: data.teléfono_1,
              telefono2: data.teléfono_2,
              telefono3: data.teléfono_3,
              fax: data.fax,
              paginaWeb: data.página_web_url,
              
              // Ubicación
              ciudad: data.ciudad,
              barrio: data.barrio,
              zonaPostal: data.zona_postal,
              
              // Fechas importantes
              fechaMatricula: data.fecha_matrícula ? new Date(data.fecha_matrícula) : null,
              fechaRenovacion: data.fecha_renovación ? new Date(data.fecha_renovación) : null,
              fechaAfiliacion: data.fecha_afiliación ? new Date(data.fecha_afiliación) : null,
              fechaConstitucion: data.fecha_constitución ? new Date(data.fecha_constitución) : null,
              fechaVigencia: data.fecha_vigencia ? new Date(data.fecha_vigencia) : null,
              
              // Información financiera
              valorActivoCorriente: parseFloat(data.valor_activo_corriente) || 0,
              valorActivoFijo: parseFloat(data.valor_activo_fijo) || 0,
              valorTotalActivoBruto: parseFloat(data.valor_total_activo_bruto) || 0,
              valorIngresosActividadOrdinaria: parseFloat(data.valor_ingresos_actividad_ordinaria) || 0,
              
              // CIIU (Clasificación Industrial Internacional Uniforme)
              ciiu1: data.ciiu_1,
              descripcionCiiu1: data.descripcion_ciiu_1,
              ciiu2: data.ciiu_2,
              descripcionCiiu2: data.descripcion_ciiu_2,
              ciiu3: data.ciiu_3,
              descripcionCiiu3: data.descripcion_ciiu_3,
              ciiu4: data.ciiu_4,
              descripcionCiiu4: data.descripcion_ciiu_4,
              
              // Metadatos
              createdAt: new Date(),
              updatedAt: new Date(),
              fuente: 'importacion_csv'
            };

            // Limpiar campos undefined o null
            Object.keys(lead).forEach(key => {
              if (lead[key] === undefined || lead[key] === null) {
                delete lead[key];
              }
            });

            leads.push(lead);
          } else {
            console.warn('Lead ignorado por falta de correo electrónico:', data);
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Conectar a MongoDB
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Verificar duplicados
    const existingEmails = await collection
      .find({ email: { $in: leads.map(lead => lead.email) } })
      .project({ email: 1 })
      .toArray();

    const existingEmailSet = new Set(existingEmails.map(doc => doc.email));
    const newLeads = leads.filter(lead => !existingEmailSet.has(lead.email));

    if (newLeads.length === 0) {
      console.log('No hay nuevos leads para importar');
      return;
    }

    // Insertar los nuevos leads
    const result = await collection.insertMany(newLeads);
    console.log(`Importados ${result.insertedCount} leads exitosamente`);
    console.log(`${leads.length - result.insertedCount} leads duplicados fueron ignorados`);

  } catch (error) {
    console.error('Error durante la importación:', error);
  } finally {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
  }
}

// Verificar si se proporcionó la ruta del archivo CSV
const csvFilePath = process.argv[2];
if (!csvFilePath) {
  console.error('Por favor, proporciona la ruta del archivo CSV como argumento');
  console.error('Uso: node scripts/import-leads.js <ruta-del-archivo.csv>');
  process.exit(1);
}

// Ejecutar la importación
importLeadsFromCSV(csvFilePath); 