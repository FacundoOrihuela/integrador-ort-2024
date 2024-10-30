import { Router } from 'express';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';
import validateRegisterMiddleware from '../middlewares/validateRegisterMiddleware.js';

const router = Router();

// Definir rutas
router.get('/', getTeachers);  // Obtener todos los profesores
router.post('/', validateRegisterMiddleware, createTeacher);  // Crear un nuevo profesor
router.put('/:id', validateRegisterMiddleware, updateTeacher);  // Actualizar un profesor
router.delete('/:id', deleteTeacher);  // Eliminar un profesor

export default router;