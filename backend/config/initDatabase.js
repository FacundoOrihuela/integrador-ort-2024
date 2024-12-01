import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

const createDatabase = async () => {
    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos '${process.env.DB_NAME}' creada o ya existe.`);
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    } finally {
        await sequelize.close();
    }
};

createDatabase();