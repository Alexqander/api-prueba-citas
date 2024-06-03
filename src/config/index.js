import dotenv from 'dotenv';

// Determinar el entorno y cargar el archivo .env correspondiente
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env';
console.log(`📚 Cargando variables de entorno desde el archivo: ${envFile}`);

const envFound = dotenv.config({ path: envFile });
if (!envFound) {
  throw new Error(`⚠️ Couldn't find ${envFile} file ⚠️`);
}

export default {
  app: {
    port: parseInt(process.env.PORT, 10)
  },
  database: {
    dbConnection: process.env.DATABASE_URL
  }
};
