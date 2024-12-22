import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import FormData from 'form-data';
import Product from '../models/Product.js'; // Asegúrate de que la ruta sea correcta
import Category from '../models/Category.js'; // Asegúrate de que la ruta sea correcta
import User from '../models/User.js';
import Administrator from '../models/Administrator.js';

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
        await User.sync({ force: false, alter: false });
        await Administrator.sync({ force: false, alter: false });
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

        const products = await Promise.all(files.map(async (file, index) => {
            const filePath = path.join(uploadsDir, file);
            const formData = new FormData();
            formData.append('name', `Producto ${index + 1}`);
            formData.append('description', `Descripción del producto ${index + 1}`);
            formData.append('price', (index + 1) * 10);
            formData.append('stock', 100);
            formData.append('categoryId', categories[index % categories.length].id);
            formData.append('image', fs.createReadStream(filePath));

            try {
                const response = await axios.post('http://localhost:3001/api/products', formData, {
                    headers: {
                        ...formData.getHeaders(),
                    },
                });
                return response.data.data;
            } catch (error) {
                console.error('Error al crear el producto:', error.response ? error.response.data : error.message);
                return null;
            }
        }));

        console.log('Productos creados correctamente:', products.filter(product => product !== null));

        // Crear usuario administrador
        const hashedPassword = await bcrypt.hash('Admin123', 10);
        const adminUser = await User.create({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            userType: 'administrator',
        });

        await Administrator.create({
            userId: adminUser.id,
        });

        console.log('Usuario administrador creado correctamente.');
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    } finally {
        await sequelize.close();
    }
};

populateDatabase();