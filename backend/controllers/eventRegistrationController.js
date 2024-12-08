import EventRegistration from '../models/EventRegistration.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

const registerForEvent = async (req, res) => {
    const { userId, eventId } = req.body;

    try {
        const user = await User.findByPk(userId);
        const event = await Event.findByPk(eventId);

        if (!user || !event) {
            return res.status(404).json({ message: 'Usuario o evento no encontrado' });
        }

        const registration = await EventRegistration.create({ userId, eventId });

        res.status(201).json({ message: 'Registro al evento exitoso', registration });
    } catch (error) {
        console.error('Error al registrar al evento:', error);
        res.status(500).json({ message: 'Error al registrar al evento', error: error.message });
    }
};

const getRegistrationsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const registrations = await EventRegistration.findAll({
            where: { userId },
            include: [{ model: Event }],
        });

        res.json(registrations);
    } catch (error) {
        console.error('Error al obtener las reservas del usuario:', error);
        res.status(500).json({ message: 'Error al obtener las reservas del usuario', error: error.message });
    }
};

const getRegistrationsByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const registrations = await EventRegistration.findAll({
            where: { eventId },
            include: [{ model: User }],
        });

        res.json(registrations);
    } catch (error) {
        console.error('Error al obtener las reservas del evento:', error);
        res.status(500).json({ message: 'Error al obtener las reservas del evento', error: error.message });
    }
};

export { registerForEvent, getRegistrationsByUser, getRegistrationsByEvent };