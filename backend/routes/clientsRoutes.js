import { Router } from 'express';
import { getClients, createClient, updateClient, deleteClient, verifyClient } from '../controllers/clientController.js';
import validateRegisterMiddleware from '../middlewares/validateRegisterMiddleware.js';

const router = Router();

// Definir rutas
router.get('/', getClients);  // Obtener todos los clientes
router.post('/', validateRegisterMiddleware, createClient);  // Crear un nuevo cliente
router.put('/:id', validateRegisterMiddleware, updateClient);  // Actualizar un cliente
router.delete('/:id', deleteClient);  // Eliminar un cliente
router.get('/verify-email', verifyClient); // Verificar el correo electrónico

export default router;