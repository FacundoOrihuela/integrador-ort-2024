import bcrypt from 'bcryptjs';
import Administrator from '../models/Administrator.js';

// Obtener todos los administradores
const getAdministrators = async (req, res) => {
    try {
        const administrators = await Administrator.findAll({
            attributes: ['id', 'name', 'email', 'created', 'isVerified'],
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
        const administrator = await Administrator.findOne({ where: { email } });
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

        const administrator = await Administrator.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json({ 
            message: `Administrador ${name} creado con éxito`, 
            data: { id: administrator.id, name, email, created: administrator.created } 
        });
    } catch (error) {
        console.error('Error al crear el administrador:', error);
        res.status(500).json({ message: 'Error al crear el administrador', error: error.message });
    }
};

// Actualizar un administrador
const updateAdministrator = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [updated] = await Administrator.update(
            { name, email, password: hashedPassword },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: `Administrador con id ${id} no encontrado` });
        }

        res.json({ message: `Administrador ${id} actualizado con éxito` });
    } catch (error) {
        console.error('Error al actualizar el administrador:', error);
        res.status(500).json({ message: 'Error al actualizar el administrador', error: error.message });
    }
};

// Eliminar un administrador
const deleteAdministrator = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Administrator.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: `Administrador con id ${id} no encontrado` });
        }

        res.json({ message: `Administrador ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el administrador:', error);
        res.status(500).json({ message: 'Error al eliminar el administrador', error: error.message });
    }
};

export { getAdministrators, getAdministratorByEmail, createAdministrator, updateAdministrator, deleteAdministrator };