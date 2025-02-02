// Middleware para validar los datos del formulario de contacto
export default function validateContactForm(req, res, next) {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validaciones simples
    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validación del formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'El correo electrónico no es válido' });
    }

    next();
}
