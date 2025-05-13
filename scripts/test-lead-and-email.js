// Script de prueba para crear lead y enviar email
const fetch = require('node-fetch');

async function testLeadAndEmail() {
  try {
    console.log('🚀 Iniciando prueba completa...');

    const testLead = {
      email: 'victorhug1@hotmail.com',
      nombre: 'Usuario de Prueba',
      segmento: 'Prueba'
    };

    // Paso 1: Crear el lead
    console.log('\n📝 Paso 1: Creando lead...');
    const createResponse = await fetch('http://192.168.1.139:3001/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testLead)
    });

    const createResult = await createResponse.json();
    console.log('Resultado de creación:', createResult);

    if (!createResult.success) {
      throw new Error(`Error creando lead: ${createResult.message}`);
    }

    // Esperar 1 segundo para asegurar que el lead se haya guardado
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Paso 2: Enviar email
    console.log('\n📧 Paso 2: Enviando email...');
    const emailResponse = await fetch('http://192.168.1.139:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        leads: [testLead]
      })
    });

    const emailResult = await emailResponse.json();
    
    console.log('\n📧 Resultado del envío:');
    console.log('------------------------');
    console.log('Status:', emailResponse.status);
    console.log('Success:', emailResult.success);
    console.log('Message:', emailResult.message);
    
    if (emailResult.results) {
      console.log('\n📊 Detalles:');
      console.log('Envíos exitosos:', emailResult.results.successful);
      console.log('Envíos fallidos:', emailResult.results.failed);
      
      if (emailResult.results.details.failed.length > 0) {
        console.log('\n❌ Errores:');
        emailResult.results.details.failed.forEach(error => console.log('-', error));
      }
    }

  } catch (error) {
    console.error('\n❌ Error en la prueba:', error.message);
  }
}

// Ejecutar la prueba
testLeadAndEmail(); 