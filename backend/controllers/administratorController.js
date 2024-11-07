import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

// Obtener todos los administradores
const getAdministrators = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, created FROM administrator');
        res.json({ message: 'Lista de administradores', data: rows });
    } catch (error) {
        console.error('Error al obtener los administradores:', error);
        res.status(500).json({ message: 'Error al obtener los administradores', error: error.message });
    }
};

// Crear un nuevo administrador
const createAdministrator = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO administrator (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.json({ 
            message: `Administrador ${name} creado con éxito`, 
            data: { id: result.insertId, name, email, created: new Date() } 
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

        const [result] = await pool.query(
            'UPDATE administrator SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, hashedPassword, id]
        );
        if (result.affectedRows === 0) {
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
        const [result] = await pool.query('DELETE FROM administrator WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Administrador con id ${id} no encontrado` });
        }
        res.json({ message: `Administrador ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el administrador:', error);
        res.status(500).json({ message: 'Error al eliminar el administrador', error: error.message });
    }
};

export { getAdministrators, createAdministrator, updateAdministrator, deleteAdministrator };