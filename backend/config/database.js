import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Agregar logs para verificar las variables de entorno
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);  // Verifica si el puerto está en las variables de entorno

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  // Aquí especificas el puerto
    dialect: 'mysql',
    logging: false, // Desactiva el logging para evitar demasiada salida en la consola
});

// Función para verificar la conexión y sincronizar la base de datos
const syncDatabase = async () => {
    try {
        // Intentar establecer la conexión con la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
        
        // Sincronizar los modelos con la base de datos
        await sequelize.sync({ alter: true }); // 'alter' para solo modificar las tablas si es necesario, sin eliminarlas
        console.log('Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('Error al conectar o sincronizar la base de datos:', error);
    }
};

syncDatabase();

export default sequelize;
