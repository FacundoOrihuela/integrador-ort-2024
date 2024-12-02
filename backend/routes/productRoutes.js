import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, upload } from '../controllers/productController.js';

const router = Router();

// Definir rutas
router.get('/', getProducts);  // Obtener todos los productos
router.post('/', upload.single('image'), createProduct);  // Crear un nuevo producto con imagen
router.put('/:id', upload.single('image'), updateProduct);  // Actualizar un producto con imagen
router.delete('/:id', deleteProduct);  // Eliminar un producto

export default router;