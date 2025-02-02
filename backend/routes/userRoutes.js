import { Router } from 'express';
import { getUserDetails, getAllUsers, uploadProfileImage, getUserById, deleteUser, blockUser, unblockUser, upload } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/me', authenticate, getUserDetails);
router.get('/all', getAllUsers);
router.get('/:userId', authenticate, getUserById);
router.post('/upload-profile-image/:userId', authenticate, upload.single('image'), uploadProfileImage);
router.delete('/:userId', authenticate, deleteUser);
router.post('/block/:userId', authenticate, blockUser);
router.post('/unblock/:userId', authenticate, unblockUser);

export default router;