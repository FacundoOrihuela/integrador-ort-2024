import express from 'express';
import { contactController } from '../controllers/contactController.js';

const router = express.Router();

// Ruta para manejar el envío del formulario de contacto
router.post('/', contactController);

export default router;
