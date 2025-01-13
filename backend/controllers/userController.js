import User from '../models/User.js';
import Client from '../models/Client.js';
import Teacher from '../models/Teacher.js';
import Administrator from '../models/Administrator.js';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';

// Configurar multer para almacenar imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Subir una imagen de perfil para un usuario
const uploadProfileImage = async (req, res) => {
    const { userId } = req.params;
    const image = req.file ? req.file.buffer : null;

    try {
        // Verificar si el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Subir la imagen a Cloudinary
        let imageUrl = null;
        if (image) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ folder: 'profile_pictures' }, (error, result) => {
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

        // Actualizar el usuario con la URL de la imagen
        user.photo = imageUrl;
        await user.save();

        res.json({ message: 'Imagen de perfil subida con éxito', data: user });
    } catch (error) {
        console.error('Error al subir la imagen de perfil:', error);
        res.status(500).json({ message: 'Error al subir la imagen de perfil', error: error.message });
    }
};

// Obtener los detalles de un usuario por ID
const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'userType', 'photo', 'created', 'isVerified', 'status', 'blockReason'],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let userData;
        if (user.userType === 'client') {
            userData = await Client.findOne({ where: { userId: user.id } });
        } else if (user.userType === 'teacher') {
            userData = await Teacher.findOne({ where: { userId: user.id } });
        } else if (user.userType === 'administrator') {
            userData = await Administrator.findOne({ where: { userId: user.id } });
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                photo: user.photo,
                created: user.created,
                isVerified: user.isVerified,
                status: user.status,
                blockReason: user.blockReason,
                ...userData?.toJSON(),
            },
        });
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener los detalles del usuario autenticado
const getUserDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'userType', 'photo', 'created', 'isVerified', 'status', 'blockReason'],
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        let userData;
        if (user.userType === 'client') {
            userData = await Client.findOne({ where: { userId: user.id } });
        } else if (user.userType === 'teacher') {
            userData = await Teacher.findOne({ where: { userId: user.id } });
        } else if (user.userType === 'administrator') {
            userData = await Administrator.findOne({ where: { userId: user.id } });
        }

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                photo: user.photo,
                created: user.created,
                isVerified: user.isVerified,
                status: user.status,
                blockReason: user.blockReason,
                ...userData?.toJSON(),
            },
        });
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'userType', 'photo', 'created', 'isVerified', 'status', 'blockReason'],
            where: {
                status: ['active', 'blocked']
            }
        });

        const userDetails = await Promise.all(users.map(async (user) => {
            let userData;
            if (user.userType === 'client') {
                userData = await Client.findOne({ where: { userId: user.id } });
            } else if (user.userType === 'teacher') {
                userData = await Teacher.findOne({ where: { userId: user.id } });
            } else if (user.userType === 'administrator') {
                userData = await Administrator.findOne({ where: { userId: user.id } });
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                photo: user.photo,
                created: user.created,
                isVerified: user.isVerified,
                status: user.status,
                blockReason: user.blockReason,
                ...userData?.toJSON(),
            };
        }));

        res.json({ users: userDetails });
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Eliminar un usuario (borrado lógico)
const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const [userUpdated] = await User.update({ status: 'deleted' }, { where: { id: userId } });

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Usuario con id ${userId} no encontrado` });
        }

        res.json({ message: `Usuario ${userId} eliminado con éxito` });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};

// Bloquear un usuario
const blockUser = async (req, res) => {
    const { userId } = req.params;
    const { blockReason } = req.body;

    try {
        const [userUpdated] = await User.update({ status: 'blocked', blockReason }, { where: { id: userId } });

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Usuario con id ${userId} no encontrado` });
        }

        res.json({ message: `Usuario ${userId} bloqueado con éxito` });
    } catch (error) {
        console.error('Error al bloquear el usuario:', error);
        res.status(500).json({ message: 'Error al bloquear el usuario', error: error.message });
    }
};

// Desbloquear un usuario
const unblockUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const [userUpdated] = await User.update({ status: 'active', blockReason: null }, { where: { id: userId } });

        if (userUpdated === 0) {
            return res.status(404).json({ message: `Usuario con id ${userId} no encontrado` });
        }

        res.json({ message: `Usuario ${userId} desbloqueado con éxito` });
    } catch (error) {
        console.error('Error al desbloquear el usuario:', error);
        res.status(500).json({ message: 'Error al desbloquear el usuario', error: error.message });
    }
};

export { getUserDetails, getAllUsers, uploadProfileImage, getUserById, deleteUser, blockUser, unblockUser, upload };