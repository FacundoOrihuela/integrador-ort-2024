import express from 'express';
import { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/create', createEvent);
router.get('/:id', getEventById);
router.get('/', getAllEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;