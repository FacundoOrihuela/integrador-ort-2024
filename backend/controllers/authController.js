import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let table;
        if (role === 'client') {
            table = 'client';
        } else if (role === 'teacher') {
            table = 'teacher';
        } else if (role === 'administrator') {
            table = 'administrator';
        } else {
            return res.status(400).json({ message: 'Rol no válido' });
        }

        const [users] = await pool.query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        const user = users[0];

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