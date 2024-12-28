import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
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

const createDatabase = async () => {
    const initialSequelize = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    try {
        // Crear la base de datos si no existe
        await initialSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Base de datos '${process.env.DB_NAME}' creada o ya existe.`);
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
        return;
    } finally {
        await initialSequelize.close();
    }

    // Esperar un momento antes de conectar a la base de datos recién creada
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newSequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    try {
        await newSequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');

        // Sincronizar los modelos
        await syncModels();
        console.log('Base de datos sincronizada correctamente.');
    } catch (error) {
        console.error('Error al conectar o sincronizar la base de datos:', error);
    } finally {
        await newSequelize.close();
    }
};

const syncModels = async () => {
    try {
        await Category.sync({ force: true });
        await Product.sync({ force: true });
        await User.sync({ force: true });
        await Administrator.sync({ force: true });
        await Group.sync({ force: true });
        await Teacher.sync({ force: true });
        await Event.sync({ force: true });
        await Membership.sync({ force: true });
        await SingleEvent.sync({ force: true });
        await RecurringEvent.sync({ force: true });
        await Rating.sync({ force: true });
        await Post.sync({ force: true });
        await Order.sync({ force: true });
        await OrderItem.sync({ force: true });
        await Comment.sync({ force: true });
        await Cart.sync({ force: true });
        await CartItem.sync({ force: true });
        await Favorite.sync({ force: true });
        await EventRegistration.sync({ force: true });
        await GroupUser.sync({ force: true });
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
        throw error;
    }
};

createDatabase();
