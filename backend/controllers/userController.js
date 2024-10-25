// Obtener todos los usuarios
const getUsers = (req, res) => {
    res.json({ message: 'Lista de usuarios' });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `Usuario ${name} creado con éxito`, data: { name, email } });
};

// Exportar las funciones utilizando ES Modules
export { getUsers, createUser };
