import User from '../models/User.js';
import Client from '../models/Client.js';
import Teacher from '../models/Teacher.js';
import Administrator from '../models/Administrator.js';

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

export { getUserDetails };