import { Router } from 'express';
import { createOrder, success, failure, pending, handlePaymentStatus, handleMembershipPaymentStatus } from '../controllers/mercadoPagoController.js';

const router = Router();

router.post('/create-order', createOrder);
router.post('/payment-status', handlePaymentStatus);
router.post('/membership-payment-status', handleMembershipPaymentStatus);
router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);

export default router;