const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function createAdminUser() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const db = client.db('pantom-app');
    const collection = db.collection('users');

    // Verificar si ya existe un usuario admin
    const existingAdmin = await collection.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Ya existe un usuario administrador');
      return;
    }

    // Crear el usuario admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = {
      email: 'admin@pantom.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await collection.insertOne(adminUser);
    console.log('Usuario administrador creado exitosamente');
    console.log('Email: admin@pantom.com');
    console.log('Contraseña: admin123');

  } catch (error) {
    console.error('Error creando usuario administrador:', error);
  } finally {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
  }
}

createAdminUser(); 