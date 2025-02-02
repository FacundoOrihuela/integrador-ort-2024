import { Router } from 'express';
import { getAdministrators, getAdministratorByEmail, createAdministrator, updateAdministrator, deleteAdministrator } from '../controllers/administratorController.js';
import validateRegisterMiddleware from '../middlewares/validateRegisterMiddleware.js';
import validateEmailMiddleware from '../middlewares/validateEmailMiddleware.js';

const router = Router();

// Definir rutas
router.get('/', getAdministrators);  // Obtener todos los administradores
router.get('/:email', getAdministratorByEmail);  // Obtener un administrador por email
router.post('/', validateRegisterMiddleware, createAdministrator);  // Crear un nuevo administrador
router.put('/:id', validateEmailMiddleware, updateAdministrator);  // Actualizar un administrador
router.delete('/:id', deleteAdministrator);  // Eliminar un administrador

export default router;