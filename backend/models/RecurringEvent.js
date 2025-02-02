import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Event from './Event.js';

const RecurringEvent = sequelize.define('RecurringEvent', {
    eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Event,
            key: 'id',
        },
    },
    recurrencePattern: {
        type: DataTypes.JSON,
        allowNull: false,
    },
}, {
    tableName: 'recurring_events',
    timestamps: false,
});

export default RecurringEvent;