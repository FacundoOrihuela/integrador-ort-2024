import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import './models/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

import clientsRoutes from './routes/clientsRoutes.js';
import administratorRoutes from './routes/administratorRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import authRoutes from './routes/authRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import eventRoutes from './routes/EventRoutes.js';
import eventRegistrationRoutes from './routes/EventRegistrationRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // Importar las rutas de órdenes

app.use('/api/clients', clientsRoutes);
app.use('/api/administrators', administratorRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-registrations', eventRegistrationRoutes);
app.use('/api/orders', orderRoutes); // Usar las rutas de órdenes

// Error handling
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
});
