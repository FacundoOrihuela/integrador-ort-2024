import { validateEmail, validatePassword } from '../utils/validateRegister.js';

const validateRegisterMiddleware = (req, res, next) => {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Email no válido' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, 3 números y una mayúscula' });
    }

    next();
};

export default validateRegisterMiddleware;