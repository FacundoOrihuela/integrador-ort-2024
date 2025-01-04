import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = Router();

// Definir rutas
router.get('/', getCategories);  // Obtener todas las categorías
router.get('/:id', getCategoryById);  // Obtener una categoría por su ID
router.post('/', createCategory);  // Crear una nueva categoría
router.put('/:id', updateCategory);  // Actualizar una categoría
router.delete('/:id', deleteCategory);  // Eliminar una categoría

export default router;