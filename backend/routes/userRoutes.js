import { Router } from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = Router();

// Definir rutas
router.get('/', getUsers);  // Obtener todos los usuarios
router.post('/', createUser);  // Crear un nuevo usuario

export default router;

