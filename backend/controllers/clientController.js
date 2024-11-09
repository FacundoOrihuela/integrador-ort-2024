import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../utils/mailer.js';
import Client from '../models/Client.js';

// Obtener todos los clientes
const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            attributes: ['id', 'name', 'email', 'created', 'isVerified'],
        });
        res.json({ message: 'Lista de clientes', data: clients });
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
};

// Obtener un cliente por email
const getClientByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const client = await Client.findOne({ where: { email } });
        if (!client) {
            return res.status(404).json({ message: `Cliente con email ${email} no encontrado` });
        }
        res.json({ message: 'Cliente encontrado', data: client });
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        res.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
    }
};

// Crear un nuevo cliente
const createClient = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Generar el token de verificación
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guardar el cliente en la base de datos
        const client = await Client.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            isVerified: false,
        });

        // Enviar el correo de verificación
        await sendVerificationEmail(email, verificationToken);

        res.json({ 
            message: `Cliente ${name} creado con éxito. Verifica tu correo electrónico para activar la cuenta.`,
            data: { id: client.id, name, email, created: client.created } 
        });
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
    }
};

// Actualizar un cliente
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [updated] = await Client.update(
            { name, email, password: hashedPassword },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: `Cliente con id ${id} no encontrado` });
        }

        res.json({ message: `Cliente ${id} actualizado con éxito` });
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
};

// Eliminar un cliente
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Client.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: `Cliente con id ${id} no encontrado` });
        }

        res.json({ message: `Cliente ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
};

// Verificar un cliente
const verifyClient = async (req, res) => {
    const { token } = req.query;

    try {
        const client = await Client.findOne({ where: { verificationToken: token } });

        if (!client) {
            return res.status(400).json({ message: 'Token inválido o cliente ya verificado.' });
        }

        client.isVerified = true;
        client.verificationToken = null;
        await client.save();

        res.json({ message: 'Cuenta verificada con éxito. Ahora puedes iniciar sesión.' });
    } catch (error) {
        console.error('Error al verificar el cliente:', error);
        res.status(500).json({ message: 'Error al verificar el cliente', error: error.message });
    }
};

export { getClients, getClientByEmail, createClient, updateClient, deleteClient, verifyClient };