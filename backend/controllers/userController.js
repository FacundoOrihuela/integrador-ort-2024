import pool from '../config/db.js';

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        // Consulta para obtener todos los usuarios
        const [rows] = await pool.query('SELECT id, name, lastname, email, created FROM users');
        res.json({ message: 'Lista de usuarios', data: rows });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    try {
        // Insertar el nuevo usuario
        const [result] = await pool.query(
            'INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)',
            [name, lastname, email, password]
        );

        res.json({ 
            message: `Usuario ${name} ${lastname} creado con éxito`, 
            data: { id: result.insertId, name, lastname, email, created: new Date() } 
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

export { getUsers, createUser };
