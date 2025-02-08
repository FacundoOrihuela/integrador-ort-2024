import Category from '../models/Category.js';

// Obtener todas las categorías
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ where: { eliminado: false } });
        res.json({ message: 'Lista de categorías', data: categories });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
    }
};

// Obtener una categoría por su ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: `Categoría con id ${id} no encontrada` });
        }
        res.json({ message: 'Categoría obtenida con éxito', data: category });
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ message: 'Error al obtener la categoría', error: error.message });
    }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await Category.create({ name, description });
        res.json({ message: 'Categoría creada con éxito', data: category });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
    }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const [updated] = await Category.update({ name, description }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: `Categoría con id ${id} no encontrada` });
        }
        res.json({ message: 'Categoría actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ message: 'Error al actualizar la categoría', error: error.message });
    }
};

// Eliminar una categoría (borrado lógico)
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: `Categoría con id ${id} no encontrada` });
        }
        category.eliminado = true;
        await category.save();
        res.json({ message: 'Categoría eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
    }
};

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };