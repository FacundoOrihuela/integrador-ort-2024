import { Router } from 'express';
import { getClients, getClientByEmail, createClient, updateClient, deleteClient, verifyClient } from '../controllers/clientController.js';
import validateRegisterMiddleware from '../middlewares/validateRegisterMiddleware.js';
import validateEmailMiddleware from '../middlewares/validateEmailMiddleware.js';

const router = Router();

// Definir rutas
router.get('/', getClients);  // Obtener todos los clientes
router.get('/verify-email', verifyClient); // Verificar el correo electrónico
router.get('/:email', getClientByEmail);  // Obtener un cliente por email
router.post('/', validateRegisterMiddleware, createClient);  // Crear un nuevo cliente
router.put('/:id', validateEmailMiddleware, updateClient);  // Actualizar un cliente
router.delete('/:id', deleteClient);  // Eliminar un cliente

export default router;