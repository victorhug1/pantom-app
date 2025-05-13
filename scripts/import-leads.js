require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const leads = require('../leads.json');

const uri = process.env.MONGODB_URI; // Asegúrate de tener tu URI en .env.local
const dbName = 'pantom-app';

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('leads');

  // Evitar duplicados por email
  const emails = new Set();
  const uniqueLeads = leads.filter(lead => {
    if (!lead.email || emails.has(lead.email)) return false;
    emails.add(lead.email);
    return true;
  });

  const result = await collection.insertMany(uniqueLeads);
  console.log(`Leads insertados: ${result.insertedCount}`);
  await client.close();
}

main().catch(console.error); 