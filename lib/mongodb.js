import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 5,
  maxIdleTimeMS: 30000,
  retryWrites: true,
  retryReads: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa una variable global para que la conexión persista entre recargas
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, es mejor no usar una variable global
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exporta una función que devuelve la promesa de conexión
export default clientPromise;