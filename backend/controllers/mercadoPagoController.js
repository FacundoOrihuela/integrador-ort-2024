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
    const payer = {
      email: "comprador.nuevo@mail.com",
      first_name: "John",
      last_name: "Doe",
      phone: {
        area_code: "1",
        number: "1234567",
      },
      address: {
        street_name: "Calle 123",
        street_number: "123",
        zip_code: "123456",
        city: "Bogotá",
      },
      identification: {
        type: "DNI",
        number: "12345678",
      },
    };
    const itemsToSale = [
      {
        id: "001",
        title: "Producto #1",
        description: "Descripción del producto #1 a pagar",
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        category_id: "1",
        quantity: 1,
        unit_price: 10000, //2.29 USD
      },
      {
        id: "002",
        title: "Producto 2",
        description: "Descripción del producto 2",
        picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
        category_id: "2",
        quantity: 2,
        unit_price: 20000, //4,58 USD
      },
    ];
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