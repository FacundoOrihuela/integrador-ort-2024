import Product from '../models/Product.js';

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
    const { name, description, price, stock, category_id } = req.body;
    try {
        const product = await Product.create({ name, description, price, stock, category_id });
        res.json({ message: 'Producto creado con éxito', data: product });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category_id } = req.body;
    try {
        const [updated] = await Product.update({ name, description, price, stock, category_id }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
        }
        res.json({ message: 'Producto actualizado con éxito' });
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

export { getProducts, createProduct, updateProduct, deleteProduct };