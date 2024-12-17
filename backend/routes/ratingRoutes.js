import { Router } from 'express';
import { getProductRatings, getProductAverageRating, createRating, updateRating, deleteRating } from '../controllers/ratingController.js';

const router = Router();

// Definir rutas
router.get('/product/:productId', getProductRatings);  // Obtener todas las calificaciones de un producto
router.get('/product/:productId/average', getProductAverageRating);  // Obtener la calificación promedio de un producto
router.post('/', createRating);  // Crear una nueva calificación
router.put('/:id', updateRating);  // Actualizar una calificación
router.delete('/:id', deleteRating);  // Eliminar una calificación

export default router;