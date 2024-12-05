import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const createDatabase = async () => {
    const initialSequelize = new Sequelize({
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    let newSequelize;
    try {
        // Crear la base de datos si no existe
        await initialSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos '${process.env.DB_NAME}' creada o ya existe.`);

        // Cerrar la conexión inicial
        await initialSequelize.close();

        // Conectar a la base de datos recién creada
        newSequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'mysql',
            logging: false,
        });

        await newSequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        // Sincronizar los modelos
        await newSequelize.sync({ force: true });
        console.log('Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    } finally {
        if (newSequelize) {
            await newSequelize.close();
        }
    }
};

createDatabase();
