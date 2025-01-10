import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import dotenv from 'dotenv';

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
      first_name: name,
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
          back_urls: {
            success: "http://localhost:3000/api/pago/success",
            failure: "http://localhost:3000/api/pago/failure",
            pending: "http://localhost:3000/api/pago/pending",
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