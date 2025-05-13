import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('pantom-app');
  const collection = db.collection('leads');

  if (req.method === 'POST') {
    try {
      // Verificar si es una inserción individual o en bloque
      const leads = Array.isArray(req.body) ? req.body : [req.body];
      
      // Validar y preparar los leads
      const leadsToInsert = [];
      const existingEmails = new Set();
      const errors = [];

      for (const lead of leads) {
        const { 
          nombre, 
          email, 
          segmento, 
          telefono,
          empresa,
          cargo,
          pais,
          ciudad,
          fuente,
          notas,
          tags = [],
          estado = 'nuevo',
          ultimaInteraccion = new Date(),
          fechaRegistro = new Date().toISOString() 
        } = lead;

        // Validación básica
        if (!nombre || !email || !segmento) {
          errors.push({ email, error: 'Faltan campos requeridos' });
          continue;
        }

        // Validación de email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errors.push({ email, error: 'Email inválido' });
          continue;
        }

        // Verificar duplicados en el lote actual
        if (existingEmails.has(email)) {
          errors.push({ email, error: 'Email duplicado en el lote' });
          continue;
        }
        existingEmails.add(email);

        leadsToInsert.push({
          nombre,
          email,
          segmento,
          telefono,
          empresa,
          cargo,
          pais,
          ciudad,
          fuente,
          notas,
          tags,
          estado,
          ultimaInteraccion: new Date(ultimaInteraccion),
          fechaRegistro: new Date(fechaRegistro),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      if (leadsToInsert.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'No hay leads válidos para insertar',
          errors 
        });
      }

      // Verificar duplicados en la base de datos
      const existingLeads = await collection.find({ 
        email: { $in: leadsToInsert.map(lead => lead.email) } 
      }).toArray();

      const existingEmailsInDB = new Set(existingLeads.map(lead => lead.email));
      const finalLeadsToInsert = leadsToInsert.filter(lead => !existingEmailsInDB.has(lead.email));

      // Insertar los leads que no existen
      if (finalLeadsToInsert.length > 0) {
        const result = await collection.insertMany(finalLeadsToInsert);
        
        return res.status(201).json({
          success: true,
          message: 'Leads procesados',
          inserted: result.insertedCount,
          duplicates: existingLeads.length,
          errors: errors.length > 0 ? errors : undefined
        });
      } else {
        return res.status(409).json({
          success: false,
          message: 'Todos los leads ya existen en la base de datos',
          duplicates: existingLeads.length,
          errors: errors.length > 0 ? errors : undefined
        });
      }

    } catch (error) {
      console.error('Error procesando leads:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  if (req.method === 'GET') {
    // Consultar leads con filtros
    try {
      const { 
        email, 
        segmento, 
        estado,
        pais,
        ciudad,
        fuente,
        tags,
        limit = 20, 
        page = 1 
      } = req.query;
      
      const query = {};
      if (email) query.email = email;
      if (segmento) query.segmento = segmento;
      if (estado) query.estado = estado;
      if (pais) query.pais = pais;
      if (ciudad) query.ciudad = ciudad;
      if (fuente) query.fuente = fuente;
      if (tags) query.tags = { $in: tags.split(',') };

      // Calcular el total de leads
      const total = await collection.countDocuments(query);

      // Obtener los leads con paginación
      const leads = await collection
        .find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .toArray();

      return res.status(200).json({ 
        success: true, 
        leads,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Error consultando leads:', error);
      return res.status(500).json({ success: false, message: 'Error interno', error: error.message });
    }
  }

  // Método no permitido
  return res.status(405).json({ success: false, message: 'Método no permitido' });
} 