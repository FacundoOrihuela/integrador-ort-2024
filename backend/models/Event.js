import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    eventType: {
        type: DataTypes.ENUM('single', 'recurring'),
        allowNull: false,
    },
}, {
    tableName: 'events',
    timestamps: true,
});

export default Event;