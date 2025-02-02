import Favorite from '../models/Favorite.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const addFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const existingFavorite = await Favorite.findOne({ where: { userId, productId } });
        if (existingFavorite) {
            return res.status(400).json({ error: 'El producto ya está en favoritos' });
        }

        const favorite = await Favorite.create({ userId, productId });
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto a favoritos' });
    }
};

export const getFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const favorites = await Favorite.findAll({
            where: { userId },
            include: [Product],
        });
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
};

export const removeFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const favorite = await Favorite.findOne({ where: { userId, productId } });
        if (!favorite) {
            return res.status(404).json({ error: 'El producto no está en favoritos' });
        }

        await favorite.destroy();
        res.status(200).json({ message: 'Producto eliminado de favoritos' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto de favoritos' });
    }
};