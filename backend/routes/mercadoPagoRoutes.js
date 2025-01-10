import { Router } from 'express';
import { createOrder, success, failure, pending } from '../controllers/mercadoPagoController.js';

const router = Router();

router.post('/create-order', createOrder);
router.get('/success', success);
router.get('/failure', failure);
router.get('/pending', pending);

export default router;