import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import Teacher from '../models/Teacher.js';
import Administrator from '../models/Administrator.js';

const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const validRoles = ['client', 'teacher', 'administrator'];

        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        const UserModel = role === 'client' ? Client : role === 'teacher' ? Teacher : Administrator;

        const user = await UserModel.findOne({ where: { email } });

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

        const token = jwt.sign({ id: user.id, email: user.email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

export { login };