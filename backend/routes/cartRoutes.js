import { Router } from 'express';
import { getCart, addToCart, removeFromCart, decreaseQuantity } from '../controllers/cartController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authenticate, getCart);
router.post('/add', authenticate, addToCart);
router.post('/remove', authenticate, removeFromCart);
router.post('/decrease', authenticate, decreaseQuantity);

export default router;