import Event from '../models/Event.js';
import SingleEvent from '../models/SingleEvent.js';
import RecurringEvent from '../models/RecurringEvent.js';
import EventRegistration from '../models/EventRegistration.js';

const createEvent = async (req, res) => {
    const { name, description, eventType, startDateTime, endDateTime, recurrencePattern } = req.body;

    try {
        const event = await Event.create({ name, description, eventType });

        if (eventType === 'single') {
            await SingleEvent.create({
                eventId: event.id,
                startDateTime,
                endDateTime,
            });
        } else if (eventType === 'recurring') {
            await RecurringEvent.create({
                eventId: event.id,
                recurrencePattern,
            });
        } else {
            return res.status(400).json({ message: 'Tipo de evento no válido' });
        }

        res.status(201).json({ message: 'Evento creado con éxito', event });
    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).json({ message: 'Error al crear el evento', error: error.message });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id, {
            include: [SingleEvent, RecurringEvent],
        });

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.json(event);
    } catch (error) {
        console.error('Error al obtener el evento:', error);
        res.status(500).json({ message: 'Error al obtener el evento', error: error.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: [SingleEvent, RecurringEvent],
        });

        res.json(events);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error al obtener los eventos', error: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, eventType, startDateTime, endDateTime, recurrencePattern } = req.body;

    try {
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        event.name = name;
        event.description = description;
        event.eventType = eventType;
        await event.save();

        if (eventType === 'single') {
            const singleEvent = await SingleEvent.findOne({ where: { eventId: id } });
            if (singleEvent) {
                singleEvent.startDateTime = startDateTime;
                singleEvent.endDateTime = endDateTime;
                await singleEvent.save();
            }
        } else if (eventType === 'recurring') {
            const recurringEvent = await RecurringEvent.findOne({ where: { eventId: id } });
            if (recurringEvent) {
                recurringEvent.recurrencePattern = recurrencePattern;
                await recurringEvent.save();
            }
        } else {
            return res.status(400).json({ message: 'Tipo de evento no válido' });
        }

        res.json({ message: 'Evento actualizado con éxito', event });
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
        res.status(500).json({ message: 'Error al actualizar el evento', error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        // Eliminar los registros de EventRegistration asociados al evento
        await EventRegistration.destroy({ where: { eventId: id } });

        // Eliminar el evento de su tabla correspondiente
        if (event.eventType === 'single') {
            await SingleEvent.destroy({ where: { eventId: id } });
        } else if (event.eventType === 'recurring') {
            await RecurringEvent.destroy({ where: { eventId: id } });
        }

        // Eliminar el evento
        await event.destroy();
        res.json({ message: 'Evento eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(500).json({ message: 'Error al eliminar el evento', error: error.message });
    }
};

export { createEvent, getEventById, getAllEvents, updateEvent, deleteEvent };