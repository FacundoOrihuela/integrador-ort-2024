import pool from '../config/db.js';

// Obtener todos los clientes
const getClients = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, created FROM client');
        res.json({ message: 'Lista de clientes', data: rows });
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ message: 'Error al obtener los clientes', error: error.message });
    }
};

// Crear un nuevo cliente
const createClient = async (req, res) => {
    const { name, email, password } = req.body;
    try {
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

// Actualizar un cliente
const updateClient = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE client SET name = ?, email = ?, password = ? WHERE id = ?',
            [name, email, password, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Cliente con id ${id} no encontrado` });
        }
        res.json({ message: `Cliente ${id} actualizado con éxito` });
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
};

// Eliminar un cliente
const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM client WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Cliente con id ${id} no encontrado` });
        }
        res.json({ message: `Cliente ${id} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
};

export { getClients, createClient, updateClient, deleteClient };