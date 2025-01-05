// import crypto from 'crypto';
// import bcrypt from 'bcryptjs';
// import { contact } from '../utils/mailer.js';
// import User from '../models/User.js';

// const contact = async (req, res) => {
//     const { email, messageBody } = req.body;

//     try {
//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             return res.status(404).json({ message: `Usuario con email ${email} no encontrado` });
//         }

//         const resetToken = crypto.randomBytes(32).toString('hex');
//         user.passwordResetToken = resetToken;
//         await user.save();

//         await contact(email, resetToken);

//         res.json({ message: 'Correo de recuperación de contraseña enviado' });
//     } catch (error) {
//         console.error('Error al solicitar la recuperación de contraseña:', error);
//         res.status(500).json({ message: 'Error al solicitar la recuperación de contraseña', error: error.message });
//     }
// };