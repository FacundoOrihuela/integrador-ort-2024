import express from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoriteController.js';

const router = express.Router();

router.post('/', addFavorite);
router.get('/:userId', getFavorites);
router.delete('/', removeFavorite); // Nuevo endpoint para eliminar un favorito

export default router;