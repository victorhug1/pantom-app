const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'pantom-app';
const COLLECTION = 'leads';

// Campos que consideramos útiles para campañas
const CAMPOS_UTILES = [
  'Nombre', 'Email', 'Nit', 'RepresentanteLegal', 'TipoOrganizacion',
  'Telefono1', 'Telefono2', 'Ciudad', 'Estado', 'FechaRenovacion',
  'ValorCapitalPagado', 'Ciiu1', 'DescripcionCiiu1', 'Ciiu2', 'DescripcionCiiu2',
  'Ciiu3', 'DescripcionCiiu3', 'Ciiu4', 'DescripcionCiiu4', 'Fuente',
];

// Limpia campos vacíos o irrelevantes de un lead
function limpiarLead(lead) {
  const limpio = {};
  for (const campo of CAMPOS_UTILES) {
    if (lead[campo] !== undefined && lead[campo] !== null && lead[campo] !== '') {
      limpio[campo] = lead[campo];
    }
  }
  return limpio;
}

// Función para convertir a número seguro
function toNumber(val) {
  if (typeof val === 'number') return val;
  if (!val || val === '' || val === null) return 0;
  return Number(String(val).replace(/[^\d.]/g, '')) || 0;
}

// Segmentación por tamaño usando el mayor valor entre ingresos, activos y capital pagado
function valorSegmentacion(lead) {
  const ingresos = toNumber(lead['valor_ingresos_actividad_ordinaria']);
  const activos = toNumber(lead['valor_total_activo_bruto']);
  const capital = toNumber(lead['valor_capital_pagado']);
  return Math.max(ingresos, activos, capital);
}

function segmentoTamanio(lead) {
  const valor = valorSegmentacion(lead);
  if (valor > 30000000000) return 'Grande';
  if (valor > 5000000000) return 'Mediana';
  if (valor > 500000000) return 'Pequeña';
  if (valor > 0) return 'Microempresa';
  return 'Sin clasificar';
}

// Filtro de sector usando descripciones y códigos CIIU
function filtroSector(lead) {
  const sectores = ['tecnología', 'informática', 'derecho', 'abogado', '4711', '6201'];
  const descs = [
    lead['descripcion_ciiu_1'],
    lead['descripcion_ciiu_2'],
    lead['descripcion_ciiu_3'],
    lead['descripcion_ciiu_4']
  ].filter(Boolean).join(' ').toLowerCase();
  const ciius = [
    lead['ciiu_1'],
    lead['ciiu_2'],
    lead['ciiu_3'],
    lead['ciiu_4']
  ].filter(Boolean).join(' ');
  return sectores.some(s =>
    descs.includes(s.toLowerCase()) ||
    ciius.includes(s)
  );
}

// Filtros personalizables
const FILTROS = {
  tieneEmail: lead => !!lead.Email && lead.Email.includes('@'),
  renovado2024: lead => lead.FechaRenovacion && String(lead.FechaRenovacion).includes('2024'),
  tamanio: lead => {
    const capital = toNumber(lead.ValorCapitalPagado);
    return segmentoTamanio(lead) === 'Mediana' || segmentoTamanio(lead) === 'Grande';
  },
  sector: lead => {
    // Ejemplo: filtrar tecnología, derecho, abogados, etc.
    const sectores = ['tecnología', 'tecnologia', 'derecho', 'abogado', 'informático', 'informatica'];
    const descs = [lead.DescripcionCiiu1, lead.DescripcionCiiu2, lead.DescripcionCiiu3, lead.DescripcionCiiu4]
      .filter(Boolean).join(' ').toLowerCase();
    return sectores.some(s => descs.includes(s));
  },
};

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION);

  // Traer todos los leads
  const leads = await collection.find({}).toArray();

  // Imprimir los primeros 5 leads originales para inspección
  console.log('Primeros 5 leads originales:');
  console.dir(leads.slice(0, 5), { depth: null });

  // Filtrar por email válido y tamaño de empresa
  const segmentados = leads.filter(lead =>
    lead['correo_electrónico_comercial'] &&
    segmentoTamanio(lead) !== 'Sin clasificar'
  );

  // Imprimir resultados clave
  console.log(`Total leads segmentados: ${segmentados.length}`);
  segmentados.forEach((lead, i) => {
    const valor = valorSegmentacion(lead);
    console.log(`\n#${i + 1}`);
    console.table({
      razon_social: lead['razón_social'],
      representante_legal: lead['representante_legal'],
      email: lead['correo_electrónico_comercial'],
      telefono_1: lead['teléfono_1'],
      telefono_2: lead['teléfono_2'],
      valor_usado_segmentacion: valor,
      tamaño: segmentoTamanio(lead)
    });
  });

  await client.close();
}

main().catch(err => {
  console.error('Error en segmentación:', err);
  process.exit(1);
}); 