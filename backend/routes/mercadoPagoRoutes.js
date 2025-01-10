import { Router } from 'express';
import { createOrder, success , failure, pending} from '../controllers/mercadoPagoController.js';

const router = Router();

router.get('/', createOrder);
router.get('/:id', success);
router.post('/', failure);
router.put('/:id', pending);


export default router;