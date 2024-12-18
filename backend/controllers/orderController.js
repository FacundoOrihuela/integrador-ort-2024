import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
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

        const totalAmount = cart.CartItems.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);

        const order = await Order.create({
            userId,
            totalAmount,
            status: 'pending',
        });

        const orderItems = await Promise.all(cart.CartItems.map(async (item) => {
            await Product.increment('timesSold', { by: 1, where: { id: item.productId } });

            return await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: item.priceAtAddition,
            });
        }));

        await CartItem.destroy({ where: { cartId: cart.id } });

        res.json({ message: 'Orden creada exitosamente', order, orderItems });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export const getOrder = async (req, res) => {
    const userId = req.user.id;
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({
            where: { id: orderId, userId },
            include: {
                model: OrderItem,
                include: [Product],
            },
        });

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json({ order });
    } catch (error) {
        console.error('Error al obtener la orden:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export const getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.findAll({
            where: { userId },
            include: {
                model: OrderItem,
                include: [Product],
            },
        });

        res.json({ orders });
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};