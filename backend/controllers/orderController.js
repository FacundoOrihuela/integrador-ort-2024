import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import User from '../models/User.js'; // Asegúrate de importar el modelo de usuario

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

export const createOrderWithProducts = async (req, res) => {
    const { userId, productIds } = req.body;

    try {
        const products = await Product.findAll({
            where: {
                id: productIds,
            },
        });

        if (products.length !== productIds.length) {
            return res.status(400).json({ message: 'Algunos productos no fueron encontrados' });
        }

        const totalAmount = products.reduce((total, product) => total + product.price, 0);

        const order = await Order.create({
            userId,
            totalAmount,
            status: 'pending',
        });

        const orderItems = await Promise.all(products.map(async (product) => {
            await Product.increment('timesSold', { by: 1, where: { id: product.id } });

            return await OrderItem.create({
                orderId: order.id,
                productId: product.id,
                quantity: 1, // Asumimos que la cantidad es 1 para cada producto
                priceAtPurchase: product.price,
            });
        }));

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

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    include: [Product],
                },
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
            ],
        });

        res.json({ orders });
    } catch (error) {
        console.error('Error al obtener todas las órdenes:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};