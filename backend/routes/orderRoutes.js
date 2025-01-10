import { Router } from 'express';
import { createOrder, createOrderWithProducts, getOrder, getOrders, getAllOrders } from '../controllers/orderController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authenticate, createOrder);
router.post('/create-with-products', authenticate, createOrderWithProducts);
router.get('/all', authenticate, getAllOrders);
router.get('/:orderId', authenticate, getOrder);
router.get('/', authenticate, getOrders);

export default router;