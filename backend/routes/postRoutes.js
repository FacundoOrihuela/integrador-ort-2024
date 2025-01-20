import { Router } from 'express';
import { getPosts, getPostById, getPostsByGroup, getPostsByUser, getPostsByUserInGroup, createPost, updatePost, deletePost, addImageToPost, upload } from '../controllers/postController.js';

const router = Router();

// Definir rutas
router.get('/', getPosts);  // Obtener todos los posts
router.get('/:id', getPostById);  // Obtener un post por su id
router.get('/group/:groupId', getPostsByGroup);  // Obtener todos los posts de un grupo determinado
router.get('/user/:userId', getPostsByUser);  // Obtener todos los posts de un usuario determinado
router.get('/user/:userId/group/:groupId', getPostsByUserInGroup);  // Obtener todos los posts de un usuario determinado en un grupo determinado
router.post('/', upload.single('photo'), createPost);  // Crear un nuevo post
router.put('/:id', upload.single('photo'), updatePost);  // Actualizar un post
router.delete('/:id', deletePost);  // Eliminar un post
router.post('/:id/image', upload.single('image'), addImageToPost);  // Agregar una imagen a un post existente

export default router;