import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Sincroniza todos los modelos
        console.log('Base de datos sincronizada');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
};

syncDatabase();

export default sequelize;