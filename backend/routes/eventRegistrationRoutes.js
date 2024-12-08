import express from 'express';
import { registerForEvent, getRegistrationsByUser, getRegistrationsByEvent } from '../controllers/EventRegistrationController.js';

const router = express.Router();

router.post('/register', registerForEvent);
router.get('/user/:userId', getRegistrationsByUser);
router.get('/event/:eventId', getRegistrationsByEvent);

export default router;