import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../utils/mailer.js';
import Client from '../models/Client.js';
import User from '../models/User.js';

// Obtener todos los clientes
const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            include: {
                model: User,
                attributes: ['id', 'name', 'email', 'created', 'isVerified'],
            },
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
        const client = await Client.findOne({
            include: {
                model: User,
                where: { email },
                attributes: ['id', 'name', 'email', 'created', 'isVerified'],
            },
        });
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

        // Crear el usuario
        const user = await User.create({
            userType: 'client',
            name,
            email,
            password: hashedPassword,
            verificationToken,
            isVerified: false,
        });

        // Crear el cliente
        await Client.create({
            userId: user.id,
        });

        // Enviar el correo de verificación
        await sendVerificationEmail(email, verificationToken);

        res.json({ 
            message: `Cliente ${name} creado con éxito. Verifica tu correo electrónico para activar la cuenta.`,
            data: { id: user.id, name, email, created: user.created } 
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

        // Actualizar el usuario
        const [userUpdated] = await User.update(
            { name, email, password: hashedPassword },
            { where: { id } }
        );

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
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
        const clientDeleted = await Client.destroy({ where: { userId: id } });

        if (clientDeleted === 0) {
            return res.status(404).json({ message: `Cliente con id ${id} no encontrado` });
        }

        await User.destroy({ where: { id } });

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
        const user = await User.findOne({ where: { verificationToken: token } });

        if (!user) {
            return res.status(400).json({ message: 'Token inválido o cliente ya verificado.' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.json({ message: 'Cuenta verificada con éxito. Ahora puedes iniciar sesión.' });
    } catch (error) {
        console.error('Error al verificar el cliente:', error);
        res.status(500).json({ message: 'Error al verificar el cliente', error: error.message });
    }
};

export { getClients, getClientByEmail, createClient, updateClient, deleteClient, verifyClient };