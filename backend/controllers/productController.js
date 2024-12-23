import Product from '../models/Product.js';
import Category from '../models/Category.js';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
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
    const image = req.file ? req.file.buffer : null;

    try {
        // Verificar si la categoría existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'La categoría especificada no existe' });
        }

        // Subir la imagen a Cloudinary
        let imageUrl = null;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(image);
            });
            imageUrl = result.secure_url;
        }

        const newProduct = await Product.create({ name, description, price, stock, categoryId, image: imageUrl });
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
    const image = req.file ? req.file.buffer : null;

    try {
        // Verificar si la categoría existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'La categoría especificada no existe' });
        }

        // Subir la nueva imagen a Cloudinary si existe
        let imageUrl = null;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(image);
            });
            imageUrl = result.secure_url;
        }

        const [updated] = await Product.update({ name, description, price, stock, categoryId, image: imageUrl }, { where: { id } });
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

// Obtener los productos más vendidos
const getTopSellingProducts = async (req, res) => {
    try {
        const topSellingProducts = await Product.findAll({
            order: [['timesSold', 'DESC']],
            limit: 6,
        });
        res.json({ message: 'Productos más vendidos obtenidos con éxito', data: topSellingProducts });
    } catch (error) {
        console.error('Error al obtener los productos más vendidos:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export { getProducts, createProduct, updateProduct, deleteProduct, getTopSellingProducts, upload };