import { Router } from 'express';
import { requestPasswordReset, verifyResetToken, resetPassword } from '../controllers/passwordController.js';

const router = Router();

router.post('/request-reset', requestPasswordReset);
router.post('/verify-reset-token', verifyResetToken);
router.post('/reset', resetPassword);

export default router;