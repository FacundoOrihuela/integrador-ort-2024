import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN,
  options: {
    timeout: 5000,
  },
});
const payment = new Payment(client); // eslint-disable-line no-unused-vars

//*Create order - Crear orden de pago
export const createOrder = async (req, res) => {
  try {
    const { email, name, items } = req.body;

    const payer = {
      email,
      name
    };

    const itemsToSale = items.map((item) => ({
      id: item.product.id,
      title: item.product.name,
      description: item.product.description,
      picture_url: item.product.image || "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
      category_id: item.product.categoryId,
      quantity: item.quantity,
      unit_price: item.priceAtPurchase,
    }));

    let result;
    const preference = new Preference(client);
    await preference
      .create({
        body: {
          items: itemsToSale,
          payer,
          redirect_urls: {
            success: "https://www.example.com/success",
            failure: "https://www.example.com/failure",
            pending: "https://www.example.com/pending",
          },
          back_urls: { // Cambiar aca para que rediriga al front
            success: "http://localhost:3000/payment-status?status=success",
            failure: "http://localhost:3000/payment-status?status=failure",
            pending: "http://localhost:3000/payment-status?status=pending",
          },
          auto_return: "approved",
        },
        requestOptions: {
          timeout: 5000,
        },
      })
      .then((x) => {
        console.log(x);
        result = x;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Pago creado: ", result);
    res.status(200).json({ url: result?.sandbox_init_point });
  } catch (error) {
    console.log("Error al crear un pago: ", error);
    res.status(500).json({ message: "Error al crear el pago" });
  }
};

//*Handle payment status - Manejar el estado del pago
export const handlePaymentStatus = async (req, res) => {
  const { status, userId } = req.body;

  if (status === 'success') {
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

      if (cart.CartItems.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
      }

      const totalAmount = cart.CartItems.reduce((total, item) => total + item.priceAtAddition * item.quantity, 0);

      const order = await Order.create({
        userId,
        totalAmount,
        status: 'completed',
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
  } else {
    res.status(200).json({ message: 'Pago no completado' });
  }
};

export const success = async (req, res) => {
  try {
    const data = req.query;
    console.log("Data del pago recibido:", data);
    res.status(200).json({
      message: "Pago realizado de forma exitosa",
      data,
    });
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};
export const failure = async (req, res) => { // eslint-disable-line no-unused-vars
  try {
    const data = req.query;
    console.log("Data del pago recibido:", data);
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};
export const pending = async (req, res) => { // eslint-disable-line no-unused-vars
  try {
    const data = req.query;
    console.log("Data del pago recibido:", data);
  } catch (error) {
    console.log("Error en el pago: ", error);
  }
};