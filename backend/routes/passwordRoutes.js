import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/passwordController.js';

const router = Router();

router.post('/request-reset', requestPasswordReset);  // Solicitar recuperación de contraseña
router.post('/reset', resetPassword);  // Actualizar la contraseña

export default router;