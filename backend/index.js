import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import clientsRoutes from './routes/clientsRoutes.js';
import administratorRoutes from './routes/administratorRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/database.js';

dotenv.config();  // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 5000;
app.disable('x-powered-by');

app.use(cors());

// Middlewares
app.use(express.json());

// Routes
app.use('/api/clients', clientsRoutes);
app.use('/api/administrators', administratorRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Sincronizar modelos con la base de datos
sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
});
