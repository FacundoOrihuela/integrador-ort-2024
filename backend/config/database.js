import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
        
        // Sincronizar la base de datos sin alterar las tablas existentes
        await sequelize.sync({ alter: false });
        console.log('Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('Error al conectar o sincronizar la base de datos:', error);
    }
};

syncDatabase();

export default sequelize;
