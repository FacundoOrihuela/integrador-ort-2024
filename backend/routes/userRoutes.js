import { Router } from 'express';
import { getUserDetails, getAllUsers, uploadProfileImage, getUserById, upload } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authenticate, getUserDetails);
router.get('/all', getAllUsers);
router.get('/:userId', authenticate, getUserById);
router.post('/upload-profile-image/:userId', authenticate, upload.single('image'), uploadProfileImage);

export default router;