import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import Teacher from '../models/Teacher.js';
import Administrator from '../models/Administrator.js';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Client.findOne({ where: { email } });
        let role = 'client';

        if (!user) {
            user = await Teacher.findOne({ where: { email } });
            role = 'teacher';
        }

        if (!user) {
            user = await Administrator.findOne({ where: { email } });
            role = 'administrator';
        }

        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        if (role === 'client' && !user.isVerified) {
            return res.status(403).json({ message: 'Cuenta no verificada. Por favor, verifica tu correo electrónico.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        user.isActive = true;
        await user.save();

        const token = jwt.sign({ id: user.id, email: user.email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

const logout = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await Client.findOne({ where: { email } });
        if (!user) {
            user = await Teacher.findOne({ where: { email } });
        }

        if (!user) {
            user = await Administrator.findOne({ where: { email } });
        }

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        user.isActive = false;
        await user.save();

        res.json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
    }
};

export { login, logout };