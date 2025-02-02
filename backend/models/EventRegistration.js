import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Event from './Event.js';

const EventRegistration = sequelize.define('EventRegistration', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Event,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('pendiente', 'aceptado', 'rechazado'),
        defaultValue: 'pendiente',
        allowNull: false,
    },
}, {
    tableName: 'event_registrations',
    timestamps: true,
});

export default EventRegistration;