import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '../utils/mailer.js';
import Client from '../models/Client.js';
import Teacher from '../models/Teacher.js';
import Administrator from '../models/Administrator.js';

const requestPasswordReset = async (req, res) => {
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
            return res.status(404).json({ message: `Usuario con email ${email} no encontrado` });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = resetToken;
        await user.save();

        await sendPasswordResetEmail(email, resetToken);

        res.json({ message: 'Correo de recuperación de contraseña enviado' });
    } catch (error) {
        console.error('Error al solicitar la recuperación de contraseña:', error);
        res.status(500).json({ message: 'Error al solicitar la recuperación de contraseña', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        let user = await Client.findOne({ where: { passwordResetToken: token } });

        if (!user) {
            user = await Teacher.findOne({ where: { passwordResetToken: token } });
        }

        if (!user) {
            user = await Administrator.findOne({ where: { passwordResetToken: token } });
        }

        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.passwordResetToken = null;
        await user.save();

        res.json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ message: 'Error al actualizar la contraseña', error: error.message });
    }
};

export { requestPasswordReset, resetPassword };