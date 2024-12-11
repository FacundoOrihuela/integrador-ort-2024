import { Router } from 'express';
import { createOrder, getOrder, getOrders } from '../controllers/orderController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authenticate, createOrder);
router.get('/:orderId', authenticate, getOrder);
router.get('/', authenticate, getOrders);

export default router;