import pool from '../config/db.js';

// Obtener todos los usuarios
const getClients = async (req, res) => {
    try {
        // Consulta para obtener todos los usuarios
        const [rows] = await pool.query('SELECT id, name, email, created FROM client');
        res.json({ message: 'Lista de clientes', data: rows });
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
};

// Crear un nuevo usuario
const createClients = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Insertar el nuevo usuario
        const [result] = await pool.query(
            'INSERT INTO client (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );

        res.json({ 
            message: `Cliente ${name} creado con éxito`, 
            data: { id: result.insertId, name, email, created: new Date() } 
        });
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
    }
};

export { getClients as getClients, createClients as createClient };
