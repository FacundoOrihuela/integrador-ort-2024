import Product from '../models/Product.js';
import Category from '../models/Category.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar multer para almacenar imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); // Usar path para construir la ruta
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ message: 'Lista de productos', data: products });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, description, price, stock, categoryId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // Verificar si la categoría existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'La categoría especificada no existe' });
        }

        const newProduct = await Product.create({ name, description, price, stock, categoryId, image });
        res.json({ message: 'Producto creado con éxito', data: newProduct });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        // Verificar si la categoría existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'La categoría especificada no existe' });
        }

        const [updated] = await Product.update({ name, description, price, stock, categoryId, image }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
        }
        const updatedProduct = await Product.findByPk(id);
        res.json({ message: 'Producto actualizado con éxito', data: updatedProduct });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Product.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
        }
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};

export { getProducts, createProduct, updateProduct, deleteProduct, upload };