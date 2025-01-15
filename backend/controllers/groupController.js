import Group from '../models/Group.js';
import User from '../models/User.js';
import GroupUser from '../models/GroupUser.js';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Obtener todos los grupos
const getGroups = async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.json({ message: 'Lista de grupos', data: groups });
    } catch (error) {
        console.error('Error al obtener los grupos:', error);
        res.status(500).json({ message: 'Error al obtener los grupos', error: error.message });
    }
};

// Obtener todas las personas de un grupo
const getGroupUsers = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByPk(groupId, {
            include: {
                model: User,
                where: { status: 'active' },
                through: { attributes: [] },
            },
        });
        if (!group) {
            return res.status(404).json({ message: `Grupo con id ${groupId} no encontrado` });
        }
        res.json({ message: 'Lista de usuarios del grupo', data: group.Users });
    } catch (error) {
        console.error('Error al obtener los usuarios del grupo:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios del grupo', error: error.message });
    }
};

// Obtener todos los grupos de una persona
const getUserGroups = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Group,
                through: { attributes: [] },
            },
        });
        if (!user) {
            return res.status(404).json({ message: `Usuario con id ${userId} no encontrado` });
        }
        res.json({ message: 'Lista de grupos del usuario', data: user.Groups });
    } catch (error) {
        console.error('Error al obtener los grupos del usuario:', error);
        res.status(500).json({ message: 'Error al obtener los grupos del usuario', error: error.message });
    }
};

// Crear un nuevo grupo con un líder asignado
const createGroup = async (req, res) => {
    const { name, description, leaderId } = req.body;
    const image = req.file ? req.file.buffer : null;

    try {
        // Verificar si el líder existe y está activo
        const leader = await User.findByPk(leaderId);
        if (!leader || leader.status !== 'active') {
            return res.status(400).json({ message: 'El líder especificado no existe o no está activo' });
        }

        // Subir la imagen a Cloudinary
        let imageUrl = null;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'groups' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(image);
            });
            imageUrl = result.secure_url;
        }

        const newGroup = await Group.create({ name, description, userId: leaderId, photo: imageUrl });
        res.json({ message: 'Grupo creado con éxito', data: newGroup });
    } catch (error) {
        console.error('Error al crear el grupo:', error);
        res.status(500).json({ message: 'Error al crear el grupo', error: error.message });
    }
};

// Actualizar un grupo
const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, description, userId } = req.body;
    const image = req.file ? req.file.buffer : null;

    try {
        // Verificar si el usuario existe y está activo
        const user = await User.findByPk(userId);
        if (!user || user.status !== 'active') {
            return res.status(400).json({ message: 'El usuario especificado no existe o no está activo' });
        }

        // Obtener el grupo existente
        const existingGroup = await Group.findByPk(id);
        if (!existingGroup) {
            return res.status(404).json({ message: `Grupo con id ${id} no encontrado` });
        }

        // Subir la nueva imagen a Cloudinary si existe
        let imageUrl = existingGroup.photo;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'groups' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
                stream.end(image);
            });
            imageUrl = result.secure_url;
        }

        const [updated] = await Group.update({ name, description, userId, photo: imageUrl }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: `Grupo con id ${id} no encontrado` });
        }
        const updatedGroup = await Group.findByPk(id);
        res.json({ message: 'Grupo actualizado con éxito', data: updatedGroup });
    } catch (error) {
        console.error('Error al actualizar el grupo:', error);
        res.status(500).json({ message: 'Error al actualizar el grupo', error: error.message });
    }
};

// Eliminar un grupo
const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Group.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: `Grupo con id ${id} no encontrado` });
        }
        res.json({ message: 'Grupo eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el grupo:', error);
        res.status(500).json({ message: 'Error al eliminar el grupo', error: error.message });
    }
};

// Setear el líder del grupo
const setGroupLeader = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        // Verificar si el usuario existe y está activo
        const user = await User.findByPk(userId);
        if (!user || user.status !== 'active') {
            return res.status(400).json({ message: 'El usuario especificado no existe o no está activo' });
        }

        const [updated] = await Group.update({ userId }, { where: { id } });
        if (updated === 0) {
            return res.status(404).json({ message: `Grupo con id ${id} no encontrado` });
        }
        const updatedGroup = await Group.findByPk(id);
        res.json({ message: 'Líder del grupo actualizado con éxito', data: updatedGroup });
    } catch (error) {
        console.error('Error al setear el líder del grupo:', error);
        res.status(500).json({ message: 'Error al setear el líder del grupo', error: error.message });
    }
};

// Agregar personas al grupo
const addUserToGroup = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        // Verificar si el grupo y el usuario existen y están activos
        const group = await Group.findByPk(groupId);
        const user = await User.findByPk(userId);
        if (!group || !user || user.status !== 'active') {
            return res.status(400).json({ message: 'El grupo o el usuario especificado no existe o no está activo' });
        }

        const newGroupUser = await GroupUser.create({ groupId, userId });
        res.json({ message: 'Usuario agregado al grupo con éxito', data: newGroupUser });
    } catch (error) {
        console.error('Error al agregar usuario al grupo:', error);
        res.status(500).json({ message: 'Error al agregar usuario al grupo', error: error.message });
    }
};

// Eliminar personas del grupo
const removeUserFromGroup = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        // Verificar si el grupo y el usuario existen
        const group = await Group.findByPk(groupId);
        const user = await User.findByPk(userId);
        if (!group || !user) {
            return res.status(400).json({ message: 'El grupo o el usuario especificado no existe' });
        }

        // Eliminar la relación entre el grupo y el usuario
        const deleted = await GroupUser.destroy({ where: { groupId, userId } });
        if (deleted === 0) {
            return res.status(404).json({ message: 'El usuario no pertenece al grupo especificado' });
        }

        res.json({ message: 'Usuario eliminado del grupo con éxito' });
    } catch (error) {
        console.error('Error al eliminar usuario del grupo:', error);
        res.status(500).json({ message: 'Error al eliminar usuario del grupo', error: error.message });
    }
};

export { getGroups, getGroupUsers, getUserGroups, createGroup, updateGroup, deleteGroup, setGroupLeader, addUserToGroup, removeUserFromGroup, upload };