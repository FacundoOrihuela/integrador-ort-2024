import { Router } from 'express';
import { getClients as getClients, createClient as createClient } from '../controllers/clientController.js';

const router = Router();

// Definir rutas
router.get('/', getClients);  // Obtener todos los clientes
router.post('/', createClient);  // Crear un nuevo cliente

export default router;

