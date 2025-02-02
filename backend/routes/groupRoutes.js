import { Router } from 'express';
import { getGroups, getGroupUsers, getUserGroups, createGroup, updateGroup, deleteGroup, setGroupLeader, addUserToGroup, removeUserFromGroup, upload } from '../controllers/groupController.js';

const router = Router();

// Definir rutas
router.get('/', getGroups);  // Obtener todos los grupos
router.get('/:groupId/users', getGroupUsers);  // Obtener todas las personas de un grupo
router.get('/user/:userId/groups', getUserGroups);  // Obtener todos los grupos de una persona
router.post('/', upload.single('image'), createGroup);  // Crear un nuevo grupo con imagen
router.put('/:id', upload.single('image'), updateGroup);  // Actualizar un grupo con imagen
router.delete('/:id', deleteGroup);  // Eliminar un grupo
router.put('/:id/leader', setGroupLeader);  // Setear el líder del grupo
router.post('/add-user', addUserToGroup);  // Agregar personas al grupo
router.post('/remove-user', removeUserFromGroup);  // Eliminar personas del grupo

export default router;