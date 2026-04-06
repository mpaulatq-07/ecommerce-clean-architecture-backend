import { Sequelize } from 'sequelize';

// Sustituye con tus credenciales reales
export const sequelize = new Sequelize('ecommerce_db', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export const connectMySql = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL exitosa');
  } catch (error) {
    console.error('Error conectando a MySQL:', error);
  }
};