import { Router } from 'express';
import { getAdministrators, createAdministrator, updateAdministrator, deleteAdministrator } from '../controllers/administratorController.js';
import validateRegisterMiddleware from '../middlewares/validateRegisterMiddleware.js';

const router = Router();

// Definir rutas
router.get('/', getAdministrators);  // Obtener todos los administradores
router.post('/', validateRegisterMiddleware, createAdministrator);  // Crear un nuevo administrador
router.put('/:id', validateRegisterMiddleware, updateAdministrator);  // Actualizar un administrador
router.delete('/:id', deleteAdministrator);  // Eliminar un administrador

export default router;