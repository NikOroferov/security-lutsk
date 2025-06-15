import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://nikoroferov:0nSgsH1aoZEjd0Sg@cluster0.oypbc.mongodb.net/';
const MONGODB_DB = 'security-shop-lutsk';

if (!MONGODB_URI) {
  throw new Error('Пожалуйста, определите MONGODB_URI в .env.local');
}

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB подключена успешно');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
  }
}

export default dbConnect; 