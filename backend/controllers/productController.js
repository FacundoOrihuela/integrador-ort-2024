import Product from '../models/Product.js';
import Category from '../models/Category.js';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';
import CartItem from '../models/CartItem.js';

// Configurar multer para almacenar imágenes y archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]);

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { eliminado: false } });
        res.json({ message: 'Lista de productos', data: products });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

// Obtener un producto por su ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ where: { id, eliminado: false } });
        if (!product) {
            return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
        }
        res.json({ message: 'Producto obtenido con éxito', data: product });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

// Obtener todos los productos de una categoría
const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: `Categoría con id ${categoryId} no encontrada` });
        }
        const products = await Product.findAll({ where: { categoryId, eliminado: false } });
        res.json({ message: 'Lista de productos de la categoría', data: products });
    } catch (error) {
        console.error('Error al obtener los productos de la categoría:', error);
        res.status(500).json({ message: 'Error al obtener los productos de la categoría', error: error.message });
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { name, description, price, stock, categoryId } = req.body;
    const image = req.files?.image ? req.files.image[0].buffer : null;
    const file = req.files?.file ? req.files.file[0].buffer : null;

    try {
        // Verificar si la categoría existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'La categoría especificada no existe' });
        }

        // Verificar que la imagen y el archivo estén presentes
        if (!image || !file) {
            return res.status(400).json({ message: 'La imagen y el archivo son obligatorios' });
        }

        // Subir la imagen a Cloudinary
        let imageUrl = null;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'products', resource_type: 'image' }, (error, result) => {
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

        // Subir el archivo a Cloudinary
        let fileUrl = null;
        if (file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'product_files', resource_type: 'auto' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(file);
            });
            fileUrl = result.secure_url;
        }

        const newProduct = await Product.create({ name, description, price, stock, categoryId, image: imageUrl, file: fileUrl });
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
    const image = req.files?.image ? req.files.image[0].buffer : null;
    const file = req.files?.file ? req.files.file[0].buffer : null;

    try {

        // Obtener el producto existente
        const existingProduct = await Product.findByPk(id);
        if (!existingProduct) {
            return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
        }

        // Verificar si la categoría existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'La categoría especificada no existe' });
        }

        // // Verificar que la imagen y el archivo estén presentes
        // if (!image || !file) {
        //     return res.status(400).json({ message: 'La imagen y el archivo son obligatorios' });
        // }

        // Subir la nueva imagen a Cloudinary si existe
        let imageUrl = existingProduct.image;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'products', resource_type: 'image' }, (error, result) => {
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

        // Subir el nuevo archivo a Cloudinary si existe
        let fileUrl = existingProduct.file;
        if (file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'product_files', resource_type: 'auto' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(file);
            });
            fileUrl = result.secure_url;
        }

        const [updated] = await Product.update({ name, description, price, stock, categoryId, image: imageUrl, file: fileUrl }, { where: { id }, returning: true });
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

// Eliminar un producto (borrado lógico)
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminar las entradas de CartItem asociadas al producto
        await CartItem.destroy({ where: { productId: id } });

        // Establecer el campo eliminado en true
        const [updated] = await Product.update({ eliminado: true }, { where: { id } });
        if (updated === 0) {
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

export { getProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct, getTopSellingProducts, upload };