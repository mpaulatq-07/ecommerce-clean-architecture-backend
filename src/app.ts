import { connectMySql, sequelize } from './config/mysql-db';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

//conexión de Mongo
import { MongoDatabase } from './config/mongo-db';

import './infrastructure/models/mysql-product.model';
import './infrastructure/models/purchase.model';

(async() => {
  await main();
})();

async function main() {

  // 1. Conectamos a MongoDB
  await MongoDatabase.connect();

  // 2. Conectamos a MySQL
  await connectMySql();

  try {
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('Error al sincronizar tablas:', error);
  }

  // 3. Iniciamos el servidor
  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes
  });

  server.start();
}