import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import {Request, Response} from 'express';
import {PayerRequest} from 'mercadopago/dist/clients/payment/create/types';
import { PreferenceResponse } from 'mercadopago/dist/clients/preference/commonTypes';
import dotenv from 'dotenv';

dotenv.config();

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN,
    options: {
        timeout: 5000,
    },
});

// CREAR LA ORDEN
 
const payment = new Payment(client);

export const CreateOrder = async (req, res) => {
    
    const { email, name, items } = req.body;
    
    
    try{
        
         console.log(req,res);

    }catch (error) {   
        console.log('Error al crear un pago: ', error);
    }
};

