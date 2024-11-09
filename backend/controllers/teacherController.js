import bcrypt from 'bcryptjs';
import Teacher from '../models/Teacher.js';

// Obtener todos los profesores
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            attributes: ['id', 'name', 'email', 'createdAt', 'specialty', 'description'],
        });
        res.json({ message: 'Lista de profesores', data: teachers });
    } catch (error) {
        console.error('Error al obtener los profesores:', error);
        res.status(500).json({ message: 'Error al obtener los profesores', error: error.message });
    }
};

// Obtener un profesor por email
const getTeacherByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const teacher = await Teacher.findOne({ where: { email } });
        if (!teacher) {
            return res.status(404).json({ message: `Profesor con email ${email} no encontrado` });
        }
        res.json({ message: 'Profesor encontrado', data: teacher });
    } catch (error) {
        console.error('Error al obtener el profesor:', error);
        res.status(500).json({ message: 'Error al obtener el profesor', error: error.message });
    }
};

// Crear un nuevo profesor
const createTeacher = async (req, res) => {
    const { name, email, password, specialty, description } = req.body;
    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const teacher = await Teacher.create({
            name,
            email,
            password: hashedPassword,
            specialty,
            description,
        });

        res.json({ 
            message: `Profesor ${name} creado con éxito`, 
            data: { id: teacher.id, name, email, createdAt: teacher.createdAt, specialty, description } 
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

        const [updated] = await Teacher.update(
            { name, email, password: hashedPassword, specialty, description },
            { where: { id } }
        );

        if (updated === 0) {
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
        const deleted = await Teacher.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: `Profesor con id ${id} no encontrado` });
        }

        res.json({ message: `Profesor ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        res.status(500).json({ message: 'Error al eliminar el profesor', error: error.message });
    }
};

export { getTeachers, getTeacherByEmail, createTeacher, updateTeacher, deleteTeacher };