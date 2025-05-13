// Script de prueba para el envío de emails
const fetch = require('node-fetch');

async function testEmailSend() {
  try {
    console.log('🚀 Iniciando prueba de envío de email...');

    const testLead = {
      email: 'victorhug1@hotmail.com',
      nombre: 'Usuario de Prueba',
      segmento: 'Prueba'
    };

    const response = await fetch('http://192.168.1.139:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        leads: [testLead]
      })
    });

    const result = await response.json();
    
    console.log('\n📧 Resultado de la prueba:');
    console.log('------------------------');
    console.log('Status:', response.status);
    console.log('Success:', result.success);
    console.log('Message:', result.message);
    
    if (result.results) {
      console.log('\n📊 Detalles:');
      console.log('Envíos exitosos:', result.results.successful);
      console.log('Envíos fallidos:', result.results.failed);
      
      if (result.results.details.failed.length > 0) {
        console.log('\n❌ Errores:');
        result.results.details.failed.forEach(error => console.log('-', error));
      }
    }

  } catch (error) {
    console.error('\n❌ Error en la prueba:', error.message);
  }
}

// Ejecutar la prueba
testEmailSend(); 