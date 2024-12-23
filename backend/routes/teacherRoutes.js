import { Router } from 'express';
import { getTeachers, getTeacherByEmail, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';
import validateRegisterMiddleware from '../middlewares/validateRegisterMiddleware.js';
import validateEmailMiddleware from '../middlewares/validateEmailMiddleware.js';

const router = Router();

// Definir rutas
router.get('/', getTeachers);  // Obtener todos los profesores
router.get('/:email', getTeacherByEmail);  // Obtener un profesor por email
router.post('/', validateRegisterMiddleware, createTeacher);  // Crear un nuevo profesor
router.put('/:id', validateEmailMiddleware, updateTeacher);  // Actualizar un profesor
router.delete('/:id', deleteTeacher);  // Eliminar un profesor

export default router;