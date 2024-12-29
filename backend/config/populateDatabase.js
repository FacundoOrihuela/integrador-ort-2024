import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinaryConfig.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Administrator from '../models/Administrator.js';
import Group from '../models/Group.js';
import Teacher from '../models/Teacher.js';
import Event from '../models/Event.js';
import Membership from '../models/Membership.js';
import SingleEvent from '../models/SingleEvent.js';
import RecurringEvent from '../models/RecurringEvent.js';
import Rating from '../models/Rating.js';
import Post from '../models/Post.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Comment from '../models/Comment.js';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Favorite from '../models/Favorite.js';
import EventRegistration from '../models/EventRegistration.js';
import GroupUser from '../models/GroupUser.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage }); // eslint-disable-line no-unused-vars

const uploadImageToCloudinary = async (imageBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
        stream.end(imageBuffer);
    });
};

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const populateDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        // Crear categorías por defecto si no existen
        const categories = await Category.bulkCreate([
            { name: 'Podcasts' },
            { name: 'Libros' },
            { name: 'Audiolibros' },
            { name: 'PDF' },
        ], { ignoreDuplicates: true });
        console.log('Categorías creadas correctamente.');

        // Leer imágenes de la carpeta uploads
        const imagesDir = path.join(__dirname, '../uploads');
        const imageFiles = fs.readdirSync(imagesDir);

        // Crear productos con imágenes subidas a Cloudinary
        const products = await Promise.all(imageFiles.map(async (file, index) => {
            const imagePath = path.join(imagesDir, file);
            const imageBuffer = fs.readFileSync(imagePath);
            const imageUrl = await uploadImageToCloudinary(imageBuffer);

            return Product.create({
                name: `Producto ${index + 1}`,
                description: `Descripción del producto ${index + 1}`,
                price: (index + 1) * 10,
                stock: (index + 1) * 100,
                categoryId: categories[index % categories.length].id,
                image: imageUrl,
            });
        }));
        console.log('Productos creados correctamente.');

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

        // Crear 3 grupos
        const groups = await Group.bulkCreate([
            { name: 'Grupo 1', description: 'Descripción del Grupo 1', userId: adminUser.id },
            { name: 'Grupo 2', description: 'Descripción del Grupo 2', userId: adminUser.id },
            { name: 'Grupo 3', description: 'Descripción del Grupo 3', userId: adminUser.id },
        ]);
        console.log('Grupos creados correctamente.');

        // Crear 3 profesores (teachers)
        const teachers = await Promise.all([
            User.create({ name: 'Teacher 1', email: 'teacher1@gmail.com', password: hashedPassword, userType: 'teacher' }),
            User.create({ name: 'Teacher 2', email: 'teacher2@gmail.com', password: hashedPassword, userType: 'teacher' }),
            User.create({ name: 'Teacher 3', email: 'teacher3@gmail.com', password: hashedPassword, userType: 'teacher' }),
        ]);

        await Promise.all(teachers.map((teacher, index) => Teacher.create({
            userId: teacher.id,
            specialty: `Especialidad ${index + 1}`,
            description: `Descripción del Teacher ${index + 1}`,
        })));
        console.log('Profesores creados correctamente.');

        // Crear 3 eventos recurrentes
        const recurringEvents = await Promise.all([
            Event.create({ name: 'Evento Recurrente 1', description: 'Descripción del Evento Recurrente 1', eventType: 'recurring' }),
            Event.create({ name: 'Evento Recurrente 2', description: 'Descripción del Evento Recurrente 2', eventType: 'recurring' }),
            Event.create({ name: 'Evento Recurrente 3', description: 'Descripción del Evento Recurrente 3', eventType: 'recurring' }),
        ]);

        await Promise.all(recurringEvents.map((event, index) => RecurringEvent.create({
            eventId: event.id,
            recurrencePattern: { frequency: 'weekly', interval: 1, daysOfWeek: [index + 1] },
        })));
        console.log('Eventos recurrentes creados correctamente.');

        // Crear 3 eventos únicos con fechas hardcodeadas
        const singleEvents = await Promise.all([
            Event.create({ name: 'Evento Único 1', description: 'Descripción del Evento Único 1', eventType: 'single' }),
            Event.create({ name: 'Evento Único 2', description: 'Descripción del Evento Único 2', eventType: 'single' }),
            Event.create({ name: 'Evento Único 3', description: 'Descripción del Evento Único 3', eventType: 'single' }),
        ]);

        await Promise.all(singleEvents.map((event, index) => SingleEvent.create({
            eventId: event.id,
            startDateTime: new Date(`2023-12-0${index + 1}T10:00:00Z`),
            endDateTime: new Date(`2023-12-0${index + 1}T11:00:00Z`),
        })));
        console.log('Eventos únicos creados correctamente.');

        // Crear 3 membresías
        await Membership.bulkCreate([
            { name: 'Membresía 1', description: 'Descripción de la Membresía 1', price: 10, duration: 30 },
            { name: 'Membresía 2', description: 'Descripción de la Membresía 2', price: 20, duration: 60 },
            { name: 'Membresía 3', description: 'Descripción de la Membresía 3', price: 30, duration: 90 },
        ]);
        console.log('Membresías creadas correctamente.');

        // Crear 3 posts
        const posts = await Post.bulkCreate([
            { userId: adminUser.id, groupId: groups[0].id, content: 'Contenido del post 1' },
            { userId: adminUser.id, groupId: groups[1].id, content: 'Contenido del post 2' },
            { userId: adminUser.id, groupId: groups[2].id, content: 'Contenido del post 3' },
        ]);
        console.log('Posts creados correctamente.');

        // Crear 3 comentarios
        await Comment.bulkCreate([
            { userId: adminUser.id, postId: posts[0].id, content: 'Comentario 1' },
            { userId: adminUser.id, postId: posts[1].id, content: 'Comentario 2' },
            { userId: adminUser.id, postId: posts[2].id, content: 'Comentario 3' },
        ]);
        console.log('Comentarios creados correctamente.');

        // Crear 3 órdenes
        const orders = await Order.bulkCreate([
            { userId: adminUser.id, totalAmount: 100, status: 'completed' },
            { userId: adminUser.id, totalAmount: 200, status: 'completed' },
            { userId: adminUser.id, totalAmount: 300, status: 'completed' },
        ]);
        console.log('Órdenes creadas correctamente.');

        // Crear 3 items de orden
        await OrderItem.bulkCreate([
            { orderId: orders[0].id, productId: products[0].id, quantity: 1, priceAtPurchase: products[0].price },
            { orderId: orders[1].id, productId: products[1].id, quantity: 2, priceAtPurchase: products[1].price },
            { orderId: orders[2].id, productId: products[2].id, quantity: 3, priceAtPurchase: products[2].price },
        ]);
        console.log('Items de órdenes creados correctamente.');

        // Crear 3 calificaciones
        await Rating.bulkCreate([
            { userId: adminUser.id, productId: products[0].id, rating: 5 },
            { userId: adminUser.id, productId: products[1].id, rating: 4 },
            { userId: adminUser.id, productId: products[2].id, rating: 3 },
        ]);
        console.log('Calificaciones creadas correctamente.');

        // Crear 3 carritos
        const carts = await Promise.all([adminUser].map(user => Cart.create({ userId: user.id })));
        console.log('Carritos creados correctamente.');

        // Crear 3 items de carrito
        await CartItem.bulkCreate([
            { cartId: carts[0].id, productId: products[0].id, quantity: 1, priceAtAddition: products[0].price },
            { cartId: carts[0].id, productId: products[1].id, quantity: 2, priceAtAddition: products[1].price },
            { cartId: carts[0].id, productId: products[2].id, quantity: 3, priceAtAddition: products[2].price },
        ]);
        console.log('Items de carritos creados correctamente.');

        // Crear 3 favoritos
        await Favorite.bulkCreate([
            { userId: adminUser.id, productId: products[0].id },
            { userId: adminUser.id, productId: products[1].id },
            { userId: adminUser.id, productId: products[2].id },
        ]);
        console.log('Favoritos creados correctamente.');

        // Crear 3 registros de eventos
        await EventRegistration.bulkCreate([
            { userId: adminUser.id, eventId: singleEvents[0].id },
            { userId: adminUser.id, eventId: singleEvents[1].id },
            { userId: adminUser.id, eventId: singleEvents[2].id },
        ]);
        console.log('Registros de eventos creados correctamente.');

        // Crear 3 relaciones de grupo-usuario
        await GroupUser.bulkCreate([
            { userId: adminUser.id, groupId: groups[0].id },
            { userId: adminUser.id, groupId: groups[1].id },
            { userId: adminUser.id, groupId: groups[2].id },
        ]);
        console.log('Relaciones de grupo-usuario creadas correctamente.');

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    } finally {
        await sequelize.close();
    }
};

populateDatabase();