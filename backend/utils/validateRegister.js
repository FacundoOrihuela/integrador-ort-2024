// Validar email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validar contraseña
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=(.*\d){3,}).{8,}$/;
    return passwordRegex.test(password);
};

export { validateEmail, validatePassword };