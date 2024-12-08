import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Event from './Event.js';

const SingleEvent = sequelize.define('SingleEvent', {
    eventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Event,
            key: 'id',
        },
    },
    startDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'single_events',
    timestamps: false,
});

export default SingleEvent;