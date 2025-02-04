import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email en la tabla User
        const user = await User.findOne({ where: { email } });

        if (!user || user.status === 'deleted') {
            return res.status(404).json({ message: 'No existe un usuario registrado con ese correo electrónico' });
        }

        if (user.userType === 'client' && !user.isVerified) {
            return res.status(403).json({ message: 'Cuenta no verificada. Por favor, verifica tu correo electrónico.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'La contraseña es incorrecta' });
        }

        user.isActive = true;
        await user.save();

        const token = jwt.sign({ id: user.id, email: user.email, role: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token, user });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

const logout = async (req, res) => {
    const { email } = req.body;

    try {
        // Buscar el usuario por email en la tabla User
        const user = await User.findOne({ where: { email } });

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