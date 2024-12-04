// userRoutes.js
import { Router } from 'express';
import { getUserDetails, getAllUsers } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authenticate, getUserDetails);
router.get('/all', getAllUsers);

export default router;