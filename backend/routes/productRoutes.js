import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = Router();

// Definir rutas
router.get('/', getProducts);  // Obtener todos los productos
router.post('/', createProduct);  // Crear un nuevo producto
router.put('/:id', updateProduct);  // Actualizar un producto
router.delete('/:id', deleteProduct);  // Eliminar un producto

export default router;