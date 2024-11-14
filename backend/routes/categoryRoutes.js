import { Router } from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = Router();

// Definir rutas
router.get('/', getCategories);  // Obtener todas las categorías
router.post('/', createCategory);  // Crear una nueva categoría
router.put('/:id', updateCategory);  // Actualizar una categoría
router.delete('/:id', deleteCategory);  // Eliminar una categoría

export default router;