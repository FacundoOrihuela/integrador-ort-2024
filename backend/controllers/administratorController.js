import bcrypt from 'bcryptjs';
import Administrator from '../models/Administrator.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';

// Obtener todos los administradores
const getAdministrators = async (req, res) => {
    try {
        const administrators = await Administrator.findAll({
            include: {
                model: User,
                attributes: ['id', 'name', 'email', 'created', 'isVerified', 'status', 'blockReason'],
                where: { status: 'active' },
            },
        });
        res.json({ message: 'Lista de administradores', data: administrators });
    } catch (error) {
        console.error('Error al obtener los administradores:', error);
        res.status(500).json({ message: 'Error al obtener los administradores', error: error.message });
    }
};

// Obtener un administrador por email
const getAdministratorByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const administrator = await Administrator.findOne({
            include: {
                model: User,
                where: { email, status: 'active' },
                attributes: ['id', 'name', 'email', 'created', 'isVerified', 'status', 'blockReason'],
            },
        });
        if (!administrator) {
            return res.status(404).json({ message: `Administrador con email ${email} no encontrado` });
        }
        res.json({ message: 'Administrador encontrado', data: administrator });
    } catch (error) {
        console.error('Error al obtener el administrador:', error);
        res.status(500).json({ message: 'Error al obtener el administrador', error: error.message });
    }
};

// Crear un nuevo administrador
const createAdministrator = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const user = await User.create({
            userType: 'administrator',
            name,
            email,
            password: hashedPassword,
        });

        // Crear el administrador
        await Administrator.create({
            userId: user.id,
        });

        // Crear el carrito 
        await Cart.create({ userId: user.id });

        res.json({ 
            message: `Administrador ${name} creado con éxito`, 
            data: { id: user.id, name, email, created: user.created } 
        });
    } catch (error) {
        console.error('Error al crear el administrador:', error);
        res.status(500).json({ message: 'Error al crear el administrador', error: error.message });
    }
};

// Actualizar un administrador
const updateAdministrator = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updateData = { name, email };

        // Actualizar el usuario
        const [userUpdated] = await User.update(updateData, { where: { id, status: 'active' } });

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
        }

        res.json({ message: `Administrador ${id} actualizado con éxito` });
    } catch (error) {
        console.error('Error al actualizar el administrador:', error);
        res.status(500).json({ message: 'Error al actualizar el administrador', error: error.message });
    }
};

// Eliminar un administrador (borrado lógico)
const deleteAdministrator = async (req, res) => {
    const { id } = req.params;
    try {
        const [userUpdated] = await User.update({ status: 'deleted' }, { where: { id } });

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Administrador con id ${id} no encontrado` });
        }

        res.json({ message: `Administrador ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el administrador:', error);
        res.status(500).json({ message: 'Error al eliminar el administrador', error: error.message });
    }
};

export { getAdministrators, getAdministratorByEmail, createAdministrator, updateAdministrator, deleteAdministrator };