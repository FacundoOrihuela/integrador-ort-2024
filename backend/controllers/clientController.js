import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../utils/mailer.js';
import pool from '../config/db.js';

// Obtener todos los clientes
const getClients = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, created FROM client');
        res.json({ message: 'Lista de clientes', data: rows });
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
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
        const [result] = await pool.query(
            'INSERT INTO client (name, email, password, verificationToken, isVerified) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, verificationToken, false]
        );

        // Enviar el correo de verificación
        await sendVerificationEmail(email, verificationToken);

        res.json({ 
            message: `Cliente ${name} creado con éxito. Verifica tu correo electrónico para activar la cuenta.`,
            data: { id: result.insertId, name, email, created: new Date() } 
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

        const [result] = await pool.query(
            'UPDATE client SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, hashedPassword, id]
        );
        if (result.affectedRows === 0) {
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
        const [result] = await pool.query('DELETE FROM client WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
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
        const [client] = await pool.query('SELECT * FROM client WHERE verificationToken = ?', [token]);

        if (client.length === 0) {
            return res.status(400).json({ message: 'Token inválido o cliente ya verificado.' });
        }

        await pool.query('UPDATE client SET isVerified = ?, verificationToken = NULL WHERE id = ?', [true, client[0].id]);

        res.json({ message: 'Cuenta verificada con éxito. Ahora puedes iniciar sesión.' });
    } catch (error) {
        console.error('Error al verificar el cliente:', error);
        res.status(500).json({ message: 'Error al verificar el cliente', error: error.message });
    }
};

export { getClients, createClient, updateClient, deleteClient, verifyClient };