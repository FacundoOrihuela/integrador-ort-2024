import dotenv from 'dotenv';
import express, { json } from 'express';

dotenv.config();  // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;
app.disable('x-powered-by');

// Middlewares
app.use(json());

// Routes
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

// Error handling
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(500).json({ message: err.message });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



