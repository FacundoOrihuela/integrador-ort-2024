import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js'; // Asegúrate de que la ruta sea correcta
import Category from '../models/Category.js'; // Asegúrate de que la ruta sea correcta

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

const populateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        // Sincronizar los modelos sin eliminar las tablas existentes
        await Category.sync({ force: false, alter: false });
        await Product.sync({ force: false, alter: false });
        console.log('Modelos sincronizados correctamente.');

        // Crear categorías por defecto si no existen
        const categories = await Category.bulkCreate([
            { name: 'Podcasts' },
            { name: 'Libros' },
            { name: 'Audiolibros' },
            { name: 'PDF' },
        ], { ignoreDuplicates: true });
        console.log('Categorías creadas correctamente.');

        // Obtener la ruta del directorio actual
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Poblar la base de datos con productos
        const uploadsDir = path.join(__dirname, '..', 'uploads');
        const files = fs.readdirSync(uploadsDir);

        const products = files.map((file, index) => ({
            name: `Producto ${index + 1}`,
            description: `Descripción del producto ${index + 1}`,
            price: (index + 1) * 10,
            stock: 100,
            categoryId: categories[index % categories.length].id, // Asignar categorías de manera cíclica
            image: `/uploads/${file}`,
        }));

        await Product.bulkCreate(products);
        console.log('Productos creados correctamente.');
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    } finally {
        await sequelize.close();
    }
};

populateDatabase();