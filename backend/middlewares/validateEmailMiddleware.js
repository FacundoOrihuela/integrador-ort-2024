import { validateEmail } from '../utils/validateRegister.js';

const validateEmailMiddleware = (req, res, next) => {
    const { email } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Email no válido' });
    }

    next();
};

export default validateEmailMiddleware;