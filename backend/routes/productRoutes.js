import { Router } from 'express';
import { getProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct, getTopSellingProducts, upload } from '../controllers/productController.js';

const router = Router();

// Definir rutas
router.get('/', getProducts);  // Obtener todos los productos
router.get('/top-selling', getTopSellingProducts);  // Obtener los productos más vendidos
router.get('/category/:categoryId', getProductsByCategory);  // Obtener todos los productos de una categoría
router.get('/:id', getProductById);  // Obtener un producto por su ID
router.post('/', upload, createProduct);  // Crear un nuevo producto con imagen y archivo
router.put('/:id', upload, updateProduct);  // Actualizar un producto con imagen y archivo
router.delete('/:id', deleteProduct);  // Eliminar un producto

export default router;