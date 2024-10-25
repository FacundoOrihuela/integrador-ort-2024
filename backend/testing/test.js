import pool from '../config/db.js'; // Asegúrate de importar tu pool de conexiones

// Función para probar la conexión a la base de datos
const testDatabaseConnection = async () => {
  try {
    // Obtener una conexión del pool
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos exitosa');

    // Liberar la conexión después de probarla
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  } finally {
    await pool.end(); // Cerrar todas las conexiones al finalizar la prueba
  }
};

export default testDatabaseConnection;
