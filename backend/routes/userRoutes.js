// userRoutes.js
import { Router } from 'express';
import { getUserDetails } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar la exportación con nombre

const router = Router();

router.get('/me', authenticate, getUserDetails);

export default router;