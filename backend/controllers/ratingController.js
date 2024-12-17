import Rating from '../models/Rating.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// Obtener todas las calificaciones de un producto
const getProductRatings = async (req, res) => {
    const { productId } = req.params;
    try {
        const ratings = await Rating.findAll({ where: { productId } });
        res.json({ message: 'Lista de calificaciones', data: ratings });
    } catch (error) {
        console.error('Error al obtener las calificaciones:', error);
        res.status(500).json({ message: 'Error al obtener las calificaciones', error: error.message });
    }
};

// Obtener la calificación promedio de un producto
const getProductAverageRating = async (req, res) => {
    const { productId } = req.params;
    try {
        const ratings = await Rating.findAll({ where: { productId } });
        const ratingCount = ratings.length;
        if (ratingCount === 0) {
            return res.status(200).json({ message: 'No hay calificaciones para este producto', averageRating: 0, ratingCount: 0 });
        }
        const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratingCount;
        res.json({ message: 'Calificación promedio obtenida con éxito', averageRating, ratingCount });
    } catch (error) {
        console.error('Error al obtener la calificación promedio:', error);
        res.status(500).json({ message: 'Error al obtener la calificación promedio', error: error.message });
    }
};

// Crear una nueva calificación
const createRating = async (req, res) => {
    const { userId, productId, rating } = req.body;

    try {
        // Verificar si el usuario y el producto existen
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);
        if (!user || !product) {
            return res.status(400).json({ message: 'El usuario o el producto especificado no existe' });
        }

        // Verificar si el usuario ya ha calificado el producto
        const existingRating = await Rating.findOne({ where: { userId, productId } });
        if (existingRating) {
            return res.status(400).json({ message: 'El usuario ya ha calificado este producto' });
        }

        const newRating = await Rating.create({ userId, productId, rating });
        res.json({ message: 'Calificación creada con éxito', data: newRating });
    } catch (error) {
        console.error('Error al crear la calificación:', error);
        res.status(500).json({ message: 'Error al crear la calificación', error: error.message });
    }
};

// Actualizar una calificación
const updateRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    try {
        const [updated] = await Rating.update({ rating }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: `Calificación con id ${id} no encontrada` });
        }
        const updatedRating = await Rating.findByPk(id);
        res.json({ message: 'Calificación actualizada con éxito', data: updatedRating });
    } catch (error) {
        console.error('Error al actualizar la calificación:', error);
        res.status(500).json({ message: 'Error al actualizar la calificación', error: error.message });
    }
};

// Eliminar una calificación
const deleteRating = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Rating.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: `Calificación con id ${id} no encontrada` });
        }
        res.json({ message: 'Calificación eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la calificación:', error);
        res.status(500).json({ message: 'Error al eliminar la calificación', error: error.message });
    }
};

export { getProductRatings, getProductAverageRating, createRating, updateRating, deleteRating };