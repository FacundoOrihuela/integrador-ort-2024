import { Router } from 'express';
import { createOrder, getOrder, getOrders, getAllOrders } from '../controllers/orderController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authenticate, createOrder);
router.get('/all', authenticate, getAllOrders); // Mover esta línea antes de la ruta con parámetro
router.get('/:orderId', authenticate, getOrder);
router.get('/', authenticate, getOrders);

export default router;