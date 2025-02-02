import { Router } from 'express';
import { getCommentsByPost, createComment, updateComment, deleteComment, upload } from '../controllers/commentController.js';

const router = Router();

// Definir rutas
router.get('/post/:postId', getCommentsByPost);  // Obtener todos los comentarios de un post determinado
router.post('/', upload.single('image'), createComment);  // Crear un nuevo comentario
router.put('/:id', upload.single('image'), updateComment);  // Actualizar un comentario
router.delete('/:id', deleteComment);  // Eliminar un comentario

export default router;