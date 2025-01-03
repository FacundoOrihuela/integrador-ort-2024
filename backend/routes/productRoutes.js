import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getTopSellingProducts, upload } from '../controllers/productController.js';

const router = Router();

// Definir rutas
router.get('/', getProducts);  // Obtener todos los productos
router.post('/', upload, createProduct);  // Crear un nuevo producto con imagen y archivo
router.put('/:id', upload, updateProduct);  // Actualizar un producto con imagen y archivo
router.delete('/:id', deleteProduct);  // Eliminar un producto
router.get('/top-selling', getTopSellingProducts);

export default router;