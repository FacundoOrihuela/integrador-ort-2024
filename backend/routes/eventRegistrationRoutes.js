import express from 'express';
import { registerForEvent, approveRegistration, rejectRegistration, deleteRegistration, getRegistrationsByUser, getRegistrationsByEvent } from '../controllers/eventRegistrationController.js';

const router = express.Router();

router.post('/register', registerForEvent);
router.post('/approve', approveRegistration);
router.post('/reject', rejectRegistration);
router.post('/delete', deleteRegistration);
router.get('/user/:userId', getRegistrationsByUser);
router.get('/event/:eventId', getRegistrationsByEvent);

export default router;