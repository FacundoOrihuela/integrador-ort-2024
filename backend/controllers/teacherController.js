import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

// Obtener todos los profesores
const getTeachers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, created, specialty, description FROM teacher');
        res.json({ message: 'Lista de profesores', data: rows });
    } catch (error) {
        console.error('Error al obtener los profesores:', error);
        res.status(500).json({ message: 'Error al obtener los profesores', error: error.message });
    }
};

// Crear un nuevo profesor
const createTeacher = async (req, res) => {
    const { name, email, password, specialty, description } = req.body;
    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO teacher (name, email, password, specialty, description) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, specialty, description]
        );

        res.json({ 
            message: `Profesor ${name} creado con éxito`, 
            data: { id: result.insertId, name, email, created: new Date(), specialty, description } 
        });
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        res.status(500).json({ message: 'Error al crear el profesor', error: error.message });
    }
};

// Actualizar un profesor
const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, specialty, description } = req.body;
    try {
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'UPDATE teacher SET name = ?, email = ?, password = ?, specialty = ?, description = ? WHERE id = ?',
            [name, email, hashedPassword, specialty, description, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Profesor con id ${id} no encontrado` });
        }
        res.json({ message: `Profesor ${id} actualizado con éxito` });
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        res.status(500).json({ message: 'Error al actualizar el profesor', error: error.message });
    }
};

// Eliminar un profesor
const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM teacher WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Profesor con id ${id} no encontrado` });
        }
        res.json({ message: `Profesor ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        res.status(500).json({ message: 'Error al eliminar el profesor', error: error.message });
    }
};

export { getTeachers, createTeacher, updateTeacher, deleteTeacher };