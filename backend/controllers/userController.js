import User from '../models/User.js';
import Client from '../models/Client.js';
import Teacher from '../models/Teacher.js';
import Administrator from '../models/Administrator.js';
import cloudinary from '../config/cloudinaryConfig.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar multer para almacenar imágenes temporalmente
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Subir una imagen de perfil para un usuario
const uploadProfileImage = async (req, res) => {
    const { userId } = req.params;
    const image = req.file ? req.file.path : null;

    try {
        // Verificar si el usuario existe
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Subir la imagen a Cloudinary
        let imageUrl = null;
        if (image) {
            const result = await cloudinary.uploader.upload(image, {
                folder: 'profile_pictures',
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
            attributes: ['id', 'name', 'email', 'userType', 'photo', 'created', 'isVerified'],
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
                ...userData?.toJSON(),
            },
        });
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

const getUserDetails = async (req, res) => {
    const userId = req.user.id; 

    try {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'userType', 'photo', 'created', 'isVerified'],
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
                ...userData?.toJSON(),
            },
        });
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'userType', 'photo', 'created', 'isVerified'],
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
                ...userData?.toJSON(),
            };
        }));

        res.json({ users: userDetails });
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

export { getUserDetails, getAllUsers, uploadProfileImage, getUserById, upload };