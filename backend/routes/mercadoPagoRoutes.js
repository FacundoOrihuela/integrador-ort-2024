import { Router } from 'express';
import { createOrder, success, failure, pending, handlePaymentStatus } from '../controllers/mercadoPagoController.js';

const router = Router();

router.post('/create-order', createOrder);
router.post('/payment-status', handlePaymentStatus);
router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);

export default router;