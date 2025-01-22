import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import './models/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer y parsear el archivo config.json
const configPath = path.join(__dirname, 'config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas
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
import eventRoutes from './routes/eventRoutes.js';
import eventRegistrationRoutes from './routes/eventRegistrationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import mercadoPagoRoutes from './routes/mercadoPagoRoutes.js';

import contactRoutes from './routes/contactRoutes.js';

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
app.use('/api/orders', orderRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/mercadoPago', mercadoPagoRoutes);
app.use('/api/contact', contactRoutes);

// Manejar todas las rutas con index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en ${config.apiUrl}`);
});
