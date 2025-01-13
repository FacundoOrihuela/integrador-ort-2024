import bcrypt from 'bcryptjs';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

// Obtener todos los profesores
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: {
                model: User,
                attributes: ['id', 'name', 'email', 'created', 'isVerified', 'status', 'blockReason'],
                where: { status: 'active' },
            },
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
        const teacher = await Teacher.findOne({
            include: {
                model: User,
                where: { email, status: 'active' },
                attributes: ['id', 'name', 'email', 'created', 'isVerified', 'status', 'blockReason'],
            },
        });
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

        // Crear el usuario
        const user = await User.create({
            userType: 'teacher',
            name,
            email,
            password: hashedPassword,
        });

        // Crear el profesor
        await Teacher.create({
            userId: user.id,
            specialty,
            description,
        });

        res.json({ 
            message: `Profesor ${name} creado con éxito`, 
            data: { id: user.id, name, email, created: user.created, specialty, description } 
        });
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        res.status(500).json({ message: 'Error al crear el profesor', error: error.message });
    }
};

// Actualizar un profesor
const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, email, specialty, description } = req.body;
    try {
        const updateData = { name, email };

        // Actualizar el usuario
        const [userUpdated] = await User.update(updateData, { where: { id, status: 'active' } });

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
        }

        // Actualizar el profesor
        const [teacherUpdated] = await Teacher.update(
            { specialty, description },
            { where: { userId: id } }
        );

        if (teacherUpdated === 0) {
            return res.status(404).json({ message: `Profesor con id ${id} no encontrado` });
        }

        res.json({ message: `Profesor ${id} actualizado con éxito` });
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        res.status(500).json({ message: 'Error al actualizar el profesor', error: error.message });
    }
};

// Eliminar un profesor (borrado lógico)
const deleteTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const [userUpdated] = await User.update({ status: 'deleted' }, { where: { id } });

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Profesor con id ${id} no encontrado` });
        }

        res.json({ message: `Profesor ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        res.status(500).json({ message: 'Error al eliminar el profesor', error: error.message });
    }
};

export { getTeachers, getTeacherByEmail, createTeacher, updateTeacher, deleteTeacher };