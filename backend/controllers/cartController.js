import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({
            where: { userId },
            include: {
                model: CartItem,
                include: [Product],
            },
        });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.json({ cart });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ where: { userId } });

        if (!cart) {
            cart = await Cart.create({ userId });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const [cartItem, created] = await CartItem.findOrCreate({
            where: { cartId: cart.id, productId },
            defaults: {
                quantity,
                priceAtAddition: product.price,
            },
        });

        if (!created) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }

        res.json({ message: 'Producto agregado al carrito', cartItem });
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ where: { userId } });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

        if (!cartItem) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
        }

        await cartItem.destroy();

        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};